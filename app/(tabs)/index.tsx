import { Text, View, StyleSheet, ScrollView } from "react-native";

import colors from "../colors";
import WeatherView from "@/components/WeatherView";
import SelectButton from "@/components/SelectButton";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  return (
    <ScrollView>
      <View style={styles.appScreen}> 
        <View style={styles.searchSelection}>
          <Text style={styles.header}>What are you looking for?</Text>
          <View
            style={styles.buttonsContainer}>

            <SelectButton label="Hygiene" source={require('../../assets/images/button_hygiene.png')}/>
            <SelectButton label="Food Banks" source={require('../../assets/images/button_food.png')}/>
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

const styles = StyleSheet.create({
  appScreen: {
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    gap: 55
  },
  searchSelection: {
    justifyContent: "center",
    alignItems: 'center',
    gap: 20
  },
  text: {
    color: "#fff",
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.navyBlue,
    textAlign: 'center',
    width: '100%',
  },
  buttonsContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: '6%'
  },
  weatherSection: {
    width: '100%',
    gap: 20
  }
});
