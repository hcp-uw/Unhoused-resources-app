import { StyleSheet, View, Pressable, Text } from 'react-native';
import ReviewStars from '@/components/ReviewStars';
import { Image, ImageSource } from 'expo-image';
import { useFonts } from 'expo-font';
import { BorderlessButton } from 'react-native-gesture-handler';

type Props = {
    name: string;
    content: string;
    uri: string;
}
export default function ({name, content, uri} : Props){
    const [fontsLoaded] = useFonts({
        "Roboto-Regular": require("@/assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Italic": require("@/assets/fonts/Roboto-Italic.ttf"),
        "Roboto_Condensed-ExtraBold": require("@/assets/fonts/Roboto_Condensed-ExtraBold.ttf"),
        "Roboto-Bold": require("@/assets/fonts/Roboto-Bold.ttf"),
        "Roboto-BoldItalic": require("@/assets/fonts/Roboto-BoldItalic.ttf"),
        "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
        "Roboto_Condensed-Bold": require("@/assets/fonts/Roboto_Condensed-Bold.ttf"),
        "Roboto-MediumItalic": require("@/assets/fonts/Roboto-MediumItalic.ttf"),
      });

    return(
        <View style={[{marginTop:35}]}>

            <View style={styles.rowContainer}>
                <Image source={uri} style={styles.profile}/>
                <View style = {styles.colContainer}>
                  <Text style = {styles.header}>{name}</Text>
                  <Text style={styles.desc}>App User • 26 Reviews • 5 photos</Text>
                </View>
            </View>

            <View style={[styles.rowContainer, {marginLeft:24}, {marginTop:5}]}>
                <View style={[{marginTop:2}]}>
                  <ReviewStars s={13}/>
                </View>
                <Text style={[styles.desc, {marginTop:1}]}>1 Week ago</Text>
            </View>
            <View>
                <Text style={styles.body}>{content}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profile: {
      marginTop: 0,
      marginLeft: 24,
      width: 40,
      height: 40,
      borderColor : 'red',
      borderWidth: 1,
      borderRadius: 50,
    },
    desc: {
      marginTop: 2,
      marginLeft: 10,
      color: '#8D5179',
      fontSize: 13,
      fontFamily: 'Roboto-Medium',
      width: 200,
      height: 20,
      borderColor : 'red',
      borderWidth: 1,
    },
    rowContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: 'red',
    },
    colContainer: {
      flexDirection: 'column',
    },
    body: {
      marginTop: 6,
      marginLeft: 24,
      color: '#8D5179',
      fontSize: 14,
      fontFamily: 'Roboto-Medium',
      fontWeight: 'medium',
      opacity: 0.8,
      width: 325,
      height: 200,
      borderColor : 'red',
      borderWidth: 1,
    },
    header: {
        marginTop: 0,
        marginLeft: 10,
        color: '#7C3763',
        fontSize: 17,
        fontFamily: 'Roboto-Bold',
        width: 200,
        height: 20,
        borderColor : 'red',
        borderWidth: 1,
      },
  });