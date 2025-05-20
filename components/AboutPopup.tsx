import colors from "@/app/colors";
import { Image, ImageSourcePropType, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import PersonBox from "./AboutPerson";
import BasicButton from "./BasicButton";
import AntDesign from '@expo/vector-icons/AntDesign';

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
              <Pressable onPress={onClose}><AntDesign name="close" size={24} color={colors.brown} style={{textAlign: 'right'}} /></Pressable>
              <Text style={styles.header}>Our Team</Text>
              <PersonBox 
                imgSource={require('../assets/images/bio_leo.png')}
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
                moreHobbies="Video games I liek are: Age of Empires, God of War, Invincible, Terraria, Apex Legends"
                funFact="I think I can act in a play pretty well"
              />
              <PersonBox 
                imgSource={require('../assets/images/bio_ian.jpeg')}
                name="Ian"
                tagline="CS Junior at UW"
                why="I was passionate about advocacy and knew unhoused people are treated as invisible."
                role="UI/UX Lead & Frontend Developer"
                roleDesc={
                  <View style={{marginTop: 10}}>
                    <Text style={{color: colors.lightGray}}>• Figma Design</Text>
                    <Text style={{color: colors.lightGray}}>• List Page</Text>
                    <Text style={{color: colors.lightGray}}>• Resource Page</Text>
                    <Text style={{color: colors.lightGray}}>• Logo Design</Text>
                  </View>
                }
                hobbies="Selfies, Content Creation, App Dev, Gaming"
                funFact="I was born on International Women’s Day"
              />              
              <PersonBox 
                imgSource={require('../assets/images/bio_celestine.png')}
                name="Celestine Buendia"
                tagline="Computer Science at UW"
                why="I've always been compassionate about the lack of support for unhoused individuals, which only grew living in Seattle and seeing the U District, so I wanted to practice my SWE skills towards an important cause."
                role="Frontend Developer & UI/UX"
                roleDesc={
                  <View style={{marginTop: 10}}>
                    <Text style={{color: colors.lightGray}}>• Home Page</Text>
                    <Text style={{color: colors.lightGray}}>• Weather Module</Text>
                    <Text style={{color: colors.lightGray}}>• Mission / About Us Popup (This!)</Text>
                  </View>
                }
                hobbies="Online Fandom, YouTube, Writing, Acting"
                moreHobbies="One Piece Live Action, Bill Cipher, FNAF, Undertale, MCU"
                funFact="I have written, composed, and directed a 40-minute musical"
              />
              <PersonBox 
                imgSource={require('../assets/images/bio_rai.png')}
                name="Rahil (TDB)"
                tagline="CS Junior at UW"
                why="I was passionate about advocacy and knew unhoused people are treated as invisible."
                role="UI/UX Lead & Frontend Developer"
                roleDesc={
                  <View style={{marginTop: 10}}>
                    <Text style={{color: colors.lightGray}}>• Figma Design</Text>
                    <Text style={{color: colors.lightGray}}>• List Page</Text>
                    <Text style={{color: colors.lightGray}}>• Resource Page</Text>
                    <Text style={{color: colors.lightGray}}>• Logo Design</Text>
                  </View>
                }
                hobbies="Selfies, Content Creation, App Dev, Gaming"
                funFact="I was born on International Women’s Day"
              />
              <BasicButton label="Close" onPress={onClose}/>
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
  header: {
    color: colors.brown,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 32
  },
  scrollContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});