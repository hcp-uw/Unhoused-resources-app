import { Text, View, StyleSheet } from "react-native";
import colors from "../colors";
import Button from "@/components/Button";
import AboutButton from "@/components/AboutButton";
import AboutPopup from "@/components/AboutPopup";
import { useState } from "react";

export default function AboutScreen() {
  const [isAboutVisible, setIsAboutVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>faq_page</Text>
      <AboutPopup isVisible={isAboutVisible} onClose={() => setIsAboutVisible(false)}/>
      <AboutButton onPress={() => setIsAboutVisible(true)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
  },
});
