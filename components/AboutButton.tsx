import colors from "@/app/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  onPress: () => void;
}

export default function AboutButton({ onPress }: Props) {
  return (
    <View style={styles.buttonContainer}>
    <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>About Us / Mission</Text>
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 250,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3%',
  },
  button: {
    borderRadius: 5,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.navyBlue,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
});
  