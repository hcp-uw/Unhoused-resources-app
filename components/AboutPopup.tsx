import colors from "@/app/colors";
import { Image, ImageSourcePropType, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import PersonBox from "./AboutPerson";

type AboutProps = {
  isVisible: boolean;
  onClose: () => void;
}

export default function AboutPopup({ isVisible, onClose }: AboutProps) {
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
              <PersonBox 
                imgSource={require('../assets/images/leo_bio.png')}
                name="Leonardo Paredes"
                tagline="Computer Science at UW"
                isLeader={true}
                why="I wanted to create a project with like-minded people. I am passionate about this project and wanted to refine and use my skills to build it!"
                role="Project Manager"
                roleDesc={
                  <View style={{marginTop: 10}}>
                    <Text style={{color: colors.lightGray}}>• I managed the project structure with todos & tasks</Text>
                    <Text style={{color: colors.lightGray}}>• I worked in a bit of the frontend</Text>
                    <Text style={{color: colors.lightGray}}>• Backend... (TODO)</Text>
                  </View>
                }
                hobbies="I like running, piano, video games, language-learning"
                moreHobbies="Age of Empires, God of War, Invincible, TERRARIA"
                funFact="I can possibly act well"
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  aboutContainer: {
    width: '85%',
    backgroundColor: colors.lightGray,
    padding: '5%',
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