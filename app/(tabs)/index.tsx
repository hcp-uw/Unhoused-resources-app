import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

import colors from "../../utils/colors";
import WeatherView from "@/components/WeatherView";
import SelectButton from "@/components/SelectButton";
import { useLocationData } from "@/utils/locationContext";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const location = useLocationData();
  if (!location) {
    return (
      <View>
        <Text style={{fontSize: 30, justifyContent: "center", paddingBottom: 25, marginLeft: 55}}>Loading location...</Text>
        <ActivityIndicator size="large" style={styles.loader} />
      </View>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.appScreen}> 
          <View style={styles.searchSelection}>
            <Text style={styles.header}>{"What are you\nlooking for?"}</Text>
            <View style={styles.buttonsContainer}>
              <SelectButton label="Hygiene" source={require('../../assets/images/button_hygiene.png')}/>
              <SelectButton label="Food" source={require('../../assets/images/button_food.png')}/>
            </View>
            <View style={styles.buttonsContainer}>
              <SelectButton label="Medical" source={require('../../assets/images/button_medical.png')}/>
              <SelectButton label="Shelter" source={require('../../assets/images/button_shelter.png')}/>
            </View>
          </View>
          <View style={styles.weatherSection}>
            <Text style={styles.header}>Weather Alerts</Text>
            <WeatherView />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  appScreen: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: "center",
    padding: 32,
  },
  searchSelection: {
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    marginBottom: 35,
  },
  text: {
    color: "#fff",
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.navyBlue,
    textAlign: 'left',
    width: '100%',
    marginBottom: 20,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: '6%',
    marginBottom: '6%',
  },
  weatherSection: {
    width: '100%',
    maxWidth: 400,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
