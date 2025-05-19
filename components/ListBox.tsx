import React from 'react'
import {ScrollView, View, Text, StyleSheet, Pressable} from 'react-native';
import ReviewStars from '@/components/ReviewStars';
import Bookmark from '@/components/Bookmark';

import { useFonts } from 'expo-font';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { ResourceRow, resourceRowToString } from '@/components/ResourceRow';
import { router } from 'expo-router';

// type Props = {
//     name: String,
//     type: String,
//     dem: String,
//     time: String,
//     dist: String,
// }
export default function ListBox({ id, title, rating, lat, long,resource_type_id}: ResourceRow) {
      const [fontsLoaded] = useFonts({
        "Roboto-Regular": require("@/assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Italic": require("@/assets/fonts/Roboto-Italic.ttf"),
        "Roboto_Condensed-ExtraBold": require("@/assets/fonts/Roboto_Condensed-ExtraBold.ttf"),
        "Roboto-Bold": require("@/assets/fonts/Roboto-Bold.ttf"),
        "Roboto-BoldItalic": require("@/assets/fonts/Roboto-BoldItalic.ttf"),
        "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
        "Roboto-MediumItalic": require("@/assets/fonts/Roboto-MediumItalic.ttf"),
        
      });

      let type;
      if(resource_type_id===0){
        type = 'Hygiene'
      }
      if(resource_type_id===1){
        type = 'Food'
      }
      if(resource_type_id===2){
        type = 'Medical'
      }
      if(resource_type_id===3){
        type = 'Shelter'
      }

      function doHandleClick(): void {
        router.navigate(`/list_page?resource_page`);
      }

    return (
        <Pressable onPress={doHandleClick}>
            <View style={styles.box}>
                <View style={styles.header}>
                    <View style={styles.rowContainer}>
                        <View style={{borderWidth: 0, width: 320, justifyContent:'center'}}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
            
                        <View style={{borderWidth: 0, marginLeft: 0}}>
                            <Bookmark/>
                        </View>
            
                    </View>
            
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.bodyBox}>
                        <View style={styles.rowContainer}>
                        <AntDesign name="questioncircle" size={20} color="#37637C" marginLeft={2}/>
                            <Text style={styles.body}>{type}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Ionicons name="people" size={24} color="#37637C" />
                            <Text style={[styles.body, {marginLeft:14}]}>Unavailable</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <AntDesign name="clockcircle" size={20} color="#37637C" marginLeft={2}/>
                            <Text style={styles.body}>Unavailable</Text>
                        </View>
                        <View style={styles.rowContainer}>
                        <FontAwesome6 name="road" size={20} color="#37637C" marginLeft={1}/>
                            <Text style={[styles.body, {marginLeft:15}]}>(DestY-UserY)^2 + (DestX-UserX)^2</Text>
                        </View>
                    </View>
                    <View style={styles.starBox}>
                        <ReviewStars s={16} num={rating}></ReviewStars>
                    </View>
            
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#E1E1E1',
        width: 360,
        height: 180,
        borderRadius: 7,
        marginLeft: 17,
        marginTop: 24,
    },
    bodyBox: {
        // borderColor: 'red',
        // borderWidth: 1,
        width: 245,
        height: 130,
        justifyContent: 'center',
        marginLeft: 12,
    },
    starBox: {
        // borderColor: 'yellow',
        // borderWidth: 2,
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 17,
    },
    header: {
        backgroundColor: '#37637C',
        width: 360,
        height: 50,
        marginBottom: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 21,
        fontFamily: 'Roboto-Bold',
        marginLeft: 12,
    },
    body: {
        color: '#37637C',
        fontSize: 19,
        fontFamily: 'Roboto-BoldItalic',
        marginLeft: 18,
        marginBottom: 3,
        borderColor: 'pink',
        borderWidth: 1,
    },
    rowContainer: {
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    colContainer: {
        flexDirection: 'column',
    },
});