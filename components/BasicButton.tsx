import colors from "@/utils/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
}

export default function BasicButton({ label, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.navyBlue,
    alignSelf: 'center'
  },
  buttonLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
});
  