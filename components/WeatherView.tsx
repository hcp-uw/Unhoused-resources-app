import { useEffect, useRef, useState } from "react";
import * as Location from 'expo-location';
import { Animated, Image, Platform, Pressable, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import AlertItem from "./WeatherAlert";

export type Alert = {
  headline: string;
  msgtype: string;
  severity: string;
  urgency: string;
  areas: string;
  category: string;
  event: string;
  desc: string;
  instruction: string;
}

type Weather = {
  temp_c: number;
  temp_f: number;
  is_day: boolean;
  condition: {
    text: string;
    icon: string;
  };
  wind_mph: number;
  wind_kph: number;
  wind_dir: string;
  precip_mm: number;
  precip_in: number;
  uv: number;
}

export default function WeatherView() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [isAmer, setIsAmer] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsLoading(true);
    startSpinning();
    getCurrentLocationAysnc();
  }, []);

  useEffect(() => {
    if (location) {
      getWeatherAsync();
      getWeatherAlertsAsync();
    }
  }, [location]);

  useEffect(() => {
    if (isLoading) {
      stopSpinning();
      setIsLoading(false);
    }
  }, [weather]);

  const toggleSwitch = () => setIsAmer(previousState => !previousState);

  const getCurrentLocationAysnc = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("location permissions failed");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  const getWeatherAlertsAsync = async () => {
    if (location === null) {
      return;
    }
    try {
      const response = await fetch('http://api.weatherapi.com/v1/alerts.json?key=0b50c9222bd8438ea0d232922252402&q=' 
          // + '29401' );  // location for testing
          + location.coords.latitude + ','
          + location.coords.longitude );
      const json = await response.json();
      setAlerts(json.alerts.alert);
    } catch (e) {
      console.error(e);
    }
  }

  const getWeatherAsync = async () => {
    if (location === null) {
      return;
    }
    try {
      const response = await fetch('http://api.weatherapi.com/v1/current.json?key=0b50c9222bd8438ea0d232922252402&q=' 
          // + '29401' ); // location for testing
          + location.coords.latitude + ','
          + location.coords.longitude );
      const json = await response.json();
      setWeather(json.current);
    } catch (e) {
      console.error(e);
    }
  }

  const startSpinning = () => {
    spinAnim.setValue(0);
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: Platform.OS !== 'web',
      })
    ).start();
  }

  const stopSpinning = () => {
    spinAnim.stopAnimation(() => {
      spinAnim.setValue(0);
    })
  }

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleRefesh = async () => {
    if (isLoading) return;

    setIsLoading(true);
    startSpinning();

    await getCurrentLocationAysnc();
    await Promise.all([
      getWeatherAsync(),
      getWeatherAlertsAsync()
    ]);

    if (!isLoading) return;

    stopSpinning();
    setIsLoading(false);
  }

  return (
    <View style={styles.weatherContainer}>
      {(weather === null) ? (
        <View style={styles.weatherHeader}>
          <View style={styles.weatherTop}>
            <Pressable onPress={handleRefesh} style={{ paddingTop: 15, paddingLeft: 15 }}>
              <Animated.View style={{ transform: [{ rotate: spin }]}}>
                <SimpleLineIcons 
                  name="refresh" 
                  size={20}
                  style={{ color: isLoading ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)' }}
                />
              </Animated.View>
            </Pressable>
            <View style={styles.weatherSwitch}>
              <Text style={styles.switchLabel}>°F</Text>
              <Switch 
                trackColor={{false: '#A9A9A9', true: '#A9A9A9'}}
                thumbColor='#f3f3f3'
                ios_backgroundColor='#A9A9A9'
                onValueChange={toggleSwitch}
                value={!isAmer}
              />
              <Text style={styles.switchLabel}>°C</Text>
            </View>
          </View>
          <View style={styles.weatherContent}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="cloud-sun" size={36} color='white' style={{ padding: 5, opacity: 0.5 }} />
              <Text style={[styles.iconLabel, {opacity: 0.5}]}>- - - - - - - -</Text>
            </View>
            <WeatherInfo isAmer={isAmer} isEmpty={true}/>
          </View>
        </View>
      ) : (
        <View style={styles.weatherHeader}>
          <View style={styles.weatherTop}>
            <Pressable onPress={handleRefesh} style={{ paddingTop: 15, paddingLeft: 15 }}>
              <Animated.View style={{ transform: [{ rotate: spin }]}}>
                <SimpleLineIcons 
                  name="refresh" 
                  size={20}
                  style={{ color: isLoading ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)' }}
                />
              </Animated.View>
            </Pressable>
            <View style={styles.weatherSwitch}>
              <Text style={styles.switchLabel}>°F</Text>
              <Switch 
                trackColor={{false: '#A9A9A9', true: '#A9A9A9'}}
                thumbColor='#f3f3f3'
                ios_backgroundColor='#A9A9A9'
                onValueChange={toggleSwitch}
                value={!isAmer}
              />
              <Text style={styles.switchLabel}>°C</Text>
            </View>
          </View>
          <View style={styles.weatherContent}>
            <WeatherIcon iconPath={weather?.condition.icon} altText={weather?.condition.text} />
            <WeatherInfo isAmer={isAmer} weather={weather} />
          </View>
        </View>
      )}
      <View style={styles.alertsContainer}>
        {alerts
          .filter((item, index, self) => index === self.findIndex(a => a.headline === item.headline))
          .map(item => (
            <AlertItem alert={item} key={item.headline}/>
        ))}
      </View>
    </View>
  );
}

type WeatherIconProps = {
  iconPath: string;
  altText: string;
};

function WeatherIcon({ iconPath, altText }: WeatherIconProps) {
  const iconUrl = `https:${iconPath}`;

  return (
    <View style={styles.iconContainer}>
      <Image
        source={{uri: iconUrl}}
        style={styles.icon}
      />
      <Text style={styles.iconLabel}>{altText}</Text>
    </View>
  )
}

type WeatherInfoProps = {
  isAmer: boolean;
  weather?: Weather;
  isEmpty?: boolean;
};

function WeatherInfo({ isAmer, weather, isEmpty }: WeatherInfoProps) {
  return (
    isAmer ? (
        <View style={styles.weatherInfo}>
          <Text style={[styles.infoTemp, {opacity: isEmpty ? 0.5 : 1}]}>{isEmpty? "---" : weather?.temp_f} °F</Text>
          <Text style={styles.infoSmall}>{isEmpty? "---" : weather?.wind_mph} mph  <Feather name="wind" /></Text>
          <Text style={styles.infoSmall}>{isEmpty? "---" : weather?.precip_in} in  <Ionicons name="rainy" /></Text>
          <Text style={styles.infoSmall}>{isEmpty? "---" : weather?.uv} UV  <MaterialCommunityIcons name="sun-wireless-outline" /></Text>
        </View>
    ) : (
      <View style={styles.weatherInfo}>
        <Text style={[styles.infoTemp, {opacity: isEmpty? 0.5 : 1}]}>{isEmpty? "---" : weather?.temp_c} °C</Text>
        <Text style={styles.infoSmall}>{isEmpty? "---" : weather?.wind_kph} kph  <Feather name="wind" /></Text>
        <Text style={styles.infoSmall}>{isEmpty? "---" : weather?.precip_mm} mm  <Ionicons name="rainy" /></Text>
        <Text style={styles.infoSmall}>{isEmpty? "---" : weather?.uv} UV  <MaterialCommunityIcons name="sun-wireless-outline" /></Text>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  weatherHeader: {
    backgroundColor: '#4F5D6C',
    width: '100%',
    alignItems: 'center',
    color: 'white',
    borderRadius: 10,
  },
  weatherTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingRight: 5,
    marginBottom: 5
  },
  weatherSwitch: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    transform: [
      {scale: 0.7}
    ],
    marginTop: 10
  },
  switchLabel: {
    color: 'white',
    padding: 5,
    fontSize: 18,
    opacity: 0.5,
  },
  weatherContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 25,
    paddingBottom: 20,
    alignItems: 'center'
  },
  headerText: {
    color: 'white',
  },
  alertsContainer: {
    gap: 12,
    marginTop: 20,
    margin: 10,
    width: '95%'
  },
  iconContainer: {
    alignItems: 'center',
    maxWidth: '40%'
  },
  icon: {
    width: 64,
    height: 64,
    padding: 5,
  },
  iconLabel: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: 128
  },
  weatherInfo: {
    alignItems: 'flex-end'
  },
  infoTemp: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 5
  },
  infoSmall: {
    color: 'white',
    opacity: 0.5,
    marginVertical: 1,
  },
});