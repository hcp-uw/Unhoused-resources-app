import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons' // Popular icons
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';


type Props = {
    texts: string;
    icon: string;
}
export default function MapButton ({texts, icon}: Props) {
    const[textWidth, settextWidth] = useState(0);
      const [fontsLoaded] = useFonts({
        "Roboto-Regular": require("@/assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Italic": require("@/assets/fonts/Roboto-Italic.ttf"),
        "Roboto-Bold": require("@/assets/fonts/Roboto-Bold.ttf"),
        "Roboto-BoldItalic": require("@/assets/fonts/Roboto-BoldItalic.ttf"),
        "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
        "Roboto-MediumItalic": require("@/assets/fonts/Roboto-MediumItalic.ttf"),
      });

    return(
    <Pressable style={[styles.box, {width: texts.length*13}]} onPress={() => alert('You pressed a button.')}>
        <FontAwesome5 name={icon} color='#fff' size={16} marginLeft={10}/>
        <Text style={[styles.text, {width:texts.length*9}]}>{texts}</Text>
    </Pressable>
    )
}

const styles = StyleSheet.create({
    box: {
        marginTop: 12,
        marginLeft: 5,
        width: 1,
        height: 33,
        backgroundColor: '#993F78',
        flexDirection: 'row',
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        // fontWeight: 'bold',
        textAlign: 'center',
        borderColor : 'red',
        borderWidth: 1,
        width: 1,
        //marginLeft: 4,
    },

});