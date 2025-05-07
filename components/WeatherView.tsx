import { useEffect, useState } from "react";

import * as Location from 'expo-location';
import { Image, Pressable, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Foundation } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import colors from "@/app/colors";
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
};

export default function WeatherView() {
    const [location, setLocation] = useState<Location.LocationObject | null>(
        null
    );
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [weather, setWeather] = useState<Weather | null>(null);
    const [isAmer, setIsAmer] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        console.log("getting location");
        getCurrentLocationAysnc();
    }, [refresh]);

    useEffect(() => {
        console.log("getting weather");
        if (location) {
            getWeatherAsync();
            getWeatherAlertsAsync();
        }
    }, [location, refresh]);

    const toggleSwitch = () => setIsAmer((previousState) => !previousState);

    const getCurrentLocationAysnc = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("location permissions failed");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log("location set as " + location.coords.latitude);
    };

  const getWeatherAlertsAsync = async () => {
    if (location === null) {
      return;
    }
    try {
      const response = await fetch('https://api.weatherapi.com/v1/alerts.json?key=0b50c9222bd8438ea0d232922252402&q=' 
          // + '71282' );  // location for testing
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
      const response = await fetch('https://api.weatherapi.com/v1/current.json?key=0b50c9222bd8438ea0d232922252402&q=' 
          // + '71282' ); // location for testing
          + location.coords.latitude + ','
          + location.coords.longitude );
      const json = await response.json();
      setWeather(json.current);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.weatherContainer}>
      {(weather === null) ? (
        <View style={styles.weatherHeader}>
          <View style={styles.weatherTop}>
              <View style={styles.weatherRefresh}/>
              <View style={styles.weatherSwitch}/>
          </View>
          <View style={styles.weatherContent}>
            <Text style={styles.headerText}>Loading...</Text>
          </View>
        </View>
      ) : (
        <View style={styles.weatherHeader}>
          <View style={styles.weatherTop}>
            <Pressable onPress={() => setRefresh(prev => !prev)}><SimpleLineIcons name="refresh" style={styles.weatherRefresh}/></Pressable>
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
            <AlertItem alert={item}/>
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
            <Image source={{ uri: iconUrl }} style={styles.icon} />
            <Text style={styles.iconLabel}>{altText}</Text>
        </View>
    );
}

type WeatherInfoProps = {
    isAmer: boolean;
    weather: Weather;
};

function WeatherInfo({ isAmer, weather }: WeatherInfoProps) {
    return isAmer ? (
        <View style={styles.weatherInfo}>
            <Text style={styles.infoTemp}>{weather.temp_f} °F</Text>
            <Text style={styles.infoSmall}>
                {weather.wind_mph} mph <Feather name="wind" />
            </Text>
            <Text style={styles.infoSmall}>
                {weather.precip_in} in <Ionicons name="rainy" />
            </Text>
            <Text style={styles.infoSmall}>
                {weather.uv} UV{" "}
                <MaterialCommunityIcons name="sun-wireless-outline" />
            </Text>
        </View>
    ) : (
        <View style={styles.weatherInfo}>
            <Text style={styles.infoTemp}>{weather.temp_c} °C</Text>
            <Text style={styles.infoSmall}>
                {weather.wind_kph} kph <Feather name="wind" />
            </Text>
            <Text style={styles.infoSmall}>
                {weather.precip_mm} mm <Ionicons name="rainy" />
            </Text>
            <Text style={styles.infoSmall}>
                {weather.uv} UV{" "}
                <MaterialCommunityIcons name="sun-wireless-outline" />
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  weatherContainer: {
    width: '80%',
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
  weatherRefresh: {
    color: 'white',
    fontSize: 20,
    paddingTop: 15,
    paddingLeft: 15,
    opacity: 0.5,
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
    paddingBottom: 25,
    alignItems: 'center'
  },
  headerText: {
    color: 'white',
  },
  alertsContainer: {
    margin: 5,
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
