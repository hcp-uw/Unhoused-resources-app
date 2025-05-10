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
        <Image source={props.imgSource} style={styles.img}/>
        <View>
          <Text>{props.name}</Text>
          <Text>{props.tagline}</Text>
        </View>
      </View>
      <View>
        {props.isLeader ? (
          <Text>Why did you decide to make the team?</Text>
        ):(
          <Text>Why did you decide to join the team?</Text>
        )}
        <Text>{props.why}</Text>
      </View>
      <View>
        <Text>What did you do for this project?</Text>
        <Text>My role was: {props.role}</Text>
        {props.roleDesc}
      </View>
      <View>
        <Text>Hobbies: {props.hobbies}</Text>
        {props.moreHobbies? (
          <Text>More Hobbies: {props.moreHobbies}</Text>
        ) : (
          <></>
        )}
        <Text>Fun Fact: {props.funFact}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  personBox: {
    flexDirection: 'column',
    backgroundColor: colors.brown,
    color: 'white',
    borderRadius: 5,
    padding: 10,
  },
  personHeader: {
    flexDirection: 'row',
  },
  img: {
    aspectRatio: 1,
    width: '50%',
      height: '100%',
      resizeMode: 'contain',
      borderRadius: 5,
  },
});