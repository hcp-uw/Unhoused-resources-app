import { Text, View, StyleSheet, ScrollView } from "react-native";
import BasicButton from "@/components/BasicButton";
import AboutPopup from "@/components/AboutPopup";
import { useState } from "react";
import Dropdown from "@/components/Dropdown";

export default function AboutScreen() {
  const [isAboutVisible, setIsAboutVisible] = useState<boolean>(false);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Dropdown 
          header="Error: 'Please allow location permission'"
          image={require('../../assets/images/faq_location.png')}
          text="If no location setting was selected on startup of the app, you need to go into your phone’s Settings and “Allow location permissions” for this app."
        />
        <Dropdown 
          header="Is it possible to give feedback on the app?"
          text="Since the app is not yet deployed on the App Store or Google Play Store, any feedback can be directed to any one of us using our GitHub emails!"
        />
        <Dropdown 
          header="I can’t see any resources in my area?"
          text="The app is currently designed with limited resource data, primarily within the Seattle area. We are working to expand our app in the future!"
        />
        <AboutPopup isVisible={isAboutVisible} onClose={() => setIsAboutVisible(false)}/>
        <BasicButton label="About Us" onPress={() => setIsAboutVisible(true)}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    flexGrow: 1,
    padding: 32,
  },
});
