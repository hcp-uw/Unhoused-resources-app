import colors from "@/app/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  onPress: () => void;
}

export default function AboutButton({ onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>About Us / Mission</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    width: 230,
    height: 50,
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
  