import { Text, View, StyleSheet } from "react-native";
import BasicButton from "@/components/BasicButton";
import AboutPopup from "@/components/AboutPopup";
import { useState } from "react";
import Dropdown from "@/components/Dropdown";

export default function AboutScreen() {
  const [isAboutVisible, setIsAboutVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Dropdown 
        header="Error: 'Please allow location permission'"
        image={require('../../assets/images/faq_location.png')}
        text="If no location settin was selected on startup of the app, you need to go into your phone’s Settings and “Allow location permissions” for this app."
      />
      <AboutPopup isVisible={isAboutVisible} onClose={() => setIsAboutVisible(false)}/>
      <BasicButton label="About Us" onPress={() => setIsAboutVisible(true)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 32,
  },
  text: {
    color: "#000",
  },
});
