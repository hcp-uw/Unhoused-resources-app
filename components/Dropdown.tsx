import { useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

type Props = {
  header: string;
  image: ImageSourcePropType;
  text: string;
};

export default function Dropdown({ header, image, text}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <View>
      <View>
        <Text>{header}</Text>
      </View>
      <View>
        <Image source={image} resizeMode="contain"/>
        <Text>{text}</Text>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    
  },
});