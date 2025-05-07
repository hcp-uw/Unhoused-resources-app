import colors from "@/app/colors";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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
          <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          </ScrollView>
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
    borderRadius: 3,
    padding: 10,
  },
  aboutContainer: {
    width: '80%',
    backgroundColor: colors.lightGray,
    padding: 20,
    borderRadius: 5,
    flexDirection: 'column',
    gap: 20,
    margin: 25,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  exit: {
    fontWeight: '600',
    textAlign: 'right'
  },
  scrollContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});