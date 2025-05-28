import colors from "@/utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  header: string;
  image?: ImageSourcePropType;
  text: string;
};

export default function Dropdown({ header, image, text}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen])

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  return (
    <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={styles.headerText}>{header}</Text>
        </View>
        <MaterialIcons name={isOpen ? "expand-less" : "expand-more"} color={'white'} size={40}/>
      </View>
        <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
          <View 
            style={styles.content}
            onLayout={event => {
              const height = event.nativeEvent.layout.height;
              setContentHeight(height);
            }}
          >
            {image ? (
              <Image source={image} resizeMode="contain" style={styles.img}/>
            ):(
              <View style={{height: 1}}/>
            )}
            <Text style={styles.text}>{text}</Text>
          </View>
        </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    width: '100%',
    marginBottom: 25,
  },
  header: {
    backgroundColor: colors.navyBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: '700',
    color: 'white',
    fontSize: 20,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10,
  },
  img: {
    width: '65%',
    height: 200,
    marginBottom: 10,
  },
  text: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: '700',
  }
});