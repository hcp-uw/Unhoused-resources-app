import colors from "@/app/colors";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  isVisible: boolean;
  onClose: () => void;
}

export default function AboutPopup({ isVisible, onClose }: Props) {
  return (
    <View style={styles.overlay}>
      <Modal
        animationType="none"
        transparent={true}
        visible={isVisible}
      >
        <View style={styles.overlay}>
          <View style={styles.aboutContainer}>
            <Pressable onPress={onClose}><Text style={styles.exit}>X</Text></Pressable>
            <Text>This is a people</Text>
            <View style={styles.personBox}>Person 1</View>
            <View style={styles.personBox}>Person 2</View>
            <View style={styles.personBox}>Person 3</View>
            <View style={styles.personBox}>Person 4</View>
            <View style={styles.personBox}>Person 5</View>
            <View style={styles.personBox}>Person 6</View>
          </View>
        </View>
      </Modal>
    </View>
    );
}

const styles = StyleSheet.create({
  personBox: {
    flexDirection: 'column',
    backgroundColor: colors.brown,
    color: 'white',
  },
  aboutContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exit: {
    fontWeight: '600',
    textAlign: 'right'
  }
});