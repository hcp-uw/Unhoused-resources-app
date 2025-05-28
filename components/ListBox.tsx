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

import { ResourceRow, resourceRowToString } from '@/utils/ResourceRow';
import { router } from 'expo-router';
import { getStraightDistanceInKilometers, useLocationData } from '@/utils/locationContext';

// DEBUG vars
const debug = false;  // Var to turn on/off debug messages/lines
const debugBorders = debug ? { borderWidth: 1, borderColor: 'pink' } : {}

// SIZE vars (more for ease of use/visibility)
const boxWidth = 270+40;
const boxHeight = 190;
const boxMargins = 25;
const leftHeaderWidth = 270;
const rightHeaderWidth = 40;
const cmnBorderRadius = 7;

export default function ListBox({ id, title, rating, lat, long, resource_type, time_open, demographic }: ResourceRow) {
    // console.log('rating: ' + rating);
    const [fontsLoaded] = useFonts({
        "Roboto-Regular": require("@/assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Italic": require("@/assets/fonts/Roboto-Italic.ttf"),
        "Roboto_Condensed-ExtraBold": require("@/assets/fonts/Roboto_Condensed-ExtraBold.ttf"),
        "Roboto-Bold": require("@/assets/fonts/Roboto-Bold.ttf"),
        "Roboto-BoldItalic": require("@/assets/fonts/Roboto-BoldItalic.ttf"),
        "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
        "Roboto-MediumItalic": require("@/assets/fonts/Roboto-MediumItalic.ttf"),
        
    });

    const location = useLocationData();
    const dist = getStraightDistanceInKilometers(lat, long, location?.coords.latitude, location?.coords.longitude);

    let type = resource_type;

    function doHandleClick(): void {
        router.navigate(`/resource_page?resourceRowId=${id}`);
    }

    return (
        <Pressable onPress={doHandleClick}>
            <View style={styles.box}>
                <View style={styles.header}>
                    <View style={[styles.rowContainer, debugBorders]}>
                        <View style={[{borderWidth: 0, width: leftHeaderWidth, justifyContent:'center'}, debugBorders]}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
            
                        <View style={[{borderWidth: 0, width: rightHeaderWidth, alignItems: 'center'}, debugBorders]}>
                            <Bookmark/> 
                        </View>
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View style={[styles.bodyBox, debugBorders]}>
                        <View style={styles.rowContainer}>
                        <AntDesign name="questioncircle" size={20} color="#37637C" marginLeft={2}/>
                            <Text style={styles.body}>{type}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Ionicons name="people" size={24} color="#37637C" />
                            <Text style={[styles.body, {marginLeft:14}]}>{demographic}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <AntDesign name="clockcircle" size={20} color="#37637C" marginLeft={2}/>
                            <Text style={styles.body}>{time_open}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                        <FontAwesome6 name="road" size={20} color="#37637C" marginLeft={1}/>
                            <Text style={[styles.body, {marginLeft:15}]}>{dist} km</Text>
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
    // BOX: has fixed Density-independent pixel size (!WARNING! ListBox inside Scrollview! %percent heights discouraged!)
    // INSIDE BOX: should use percentages?
    box: {
        backgroundColor: '#E1E1E1',
        width: boxWidth,
        height: boxHeight,
        borderRadius: cmnBorderRadius,
        marginLeft: boxMargins,
        marginTop: boxMargins,
        borderColor: (debug) ? ('orange') : (undefined),
        borderWidth: (debug) ? (1) : (0)
    },
    bodyBox: {
        width: 200,
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
        width: '100%',
        height: 57,
        marginBottom: 0,
        borderTopLeftRadius: cmnBorderRadius,
        borderTopRightRadius: cmnBorderRadius,
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
        // borderColor: 'pink',
        // borderWidth: 1,
    },
    rowContainer: {
        flexDirection: 'row',
        borderWidth: (debug) ? (1) : (0),
        borderColor: (debug) ? ('yellow') : (undefined),
    },
    colContainer: {
        flexDirection: 'column',
    },
});