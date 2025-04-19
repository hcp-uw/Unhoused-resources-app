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
        <Text style={styles.header}>Weather Alerts</Text>
        <WeatherView />
        {/* <Text style={styles.text}>Home screen</Text>
        <Link href="/about" style={styles.button}>
          Go to About screen
        </Link> */}
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  appScreen: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchSelection: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: "#fff",
  },
  header: {
    fontWeight: 'bold',
    fontSize: 35,
    color: colors.navyBlue
  },
  buttonsContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
