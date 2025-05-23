import colors from "@/app/colors";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

type PersonBoxProps = {
  imgSource: ImageSourcePropType;
  name: string;
  tagline: string;
  isLeader?: boolean;
  why: string;
  role: string;
  roleDesc?: React.ReactNode;
  hobbies: string;
  moreHobbies?: string;
  funFact: string;
}

export default function PersonBox(props: PersonBoxProps) {
  return (
    <View style={styles.personBox}>
      <View style={styles.personHeader}>
        <Image source={props.imgSource} style={styles.img} resizeMode="contain"/>
        <View style={styles.personInfo}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.tagline}>{props.tagline}</Text>
        </View>
      </View>
      <View style={styles.personContent}>
        <View>
          {props.isLeader ? (
            <Text style={styles.question}>Why did you decide to make the team?</Text>
          ):(
            <Text style={styles.question}>Why did you decide to join the team?</Text>
          )}
          <Text style={styles.answer}>{props.why}</Text>
        </View>
        <View>
          <Text style={styles.question}>What did you do for this project?</Text>
          <View style={styles.pair}>
            <Text style={styles.leadin}>My role was:</Text>
            <Text style={styles.fillin}>{props.role}</Text>
          </View>
          {props.roleDesc}
        </View>
        <View style={styles.otherInfo}>
          <View style={styles.pair}>
            <Text style={styles.leadin}>Hobbies:</Text>
            <Text style={styles.fillin}>{props.hobbies}</Text>
          </View>
          {props.moreHobbies? (
            <View style={styles.pair}>
              <Text style={styles.leadin}>Hobbies++:</Text>
              <Text style={styles.fillin}>{props.moreHobbies}</Text>
            </View>
          ) : (
            <></>
          )}
          <View style={styles.pair}>
            <Text style={styles.leadin}>Fun Fact:</Text>
            <Text style={styles.fillin}>{props.funFact}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  personBox: {
    flexDirection: 'column',
    backgroundColor: colors.brown,
    borderRadius: 5,
    padding: 20,
  },
  personHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 10,
    marginBottom: 15,
  },
  personContent: {
    gap: 25,
  },
  img: {
    width: '50%',
    maxWidth: 300,
    aspectRatio: 1,
    height: '100%',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: colors.lightGray,
    backgroundColor: colors.lightGray
  },
  personInfo: {
    flex: 1,
    gap: 10
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  tagline: {
    color: colors.lightGray,
    fontSize: 14,
  },
  question: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10
  },
  answer: {
    color: colors.lightGray,
  },
  pair: {
    flexDirection: 'row'
  },
  leadin: {
    color: 'white',
    fontWeight: 'bold',
    width: '40%'
  },
  fillin: {
    color: colors.lightGray,
    flex: 1
  },
  otherInfo: {
    gap: 10,
  }
});