
import React, { useEffect } from 'react'
import {ScrollView, View, Text, StyleSheet, Linking, Image} from 'react-native';
import MapButton from '@/components/MapButton';
import Ionicons from '@expo/vector-icons/Ionicons' // Popular icons
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';

import Carousel from 'react-native-snap-carousel';
import ResImage from '@/components/ResImage';
import ReviewBar from '@/components/ReviewBar';
import ReviewStars from '@/components/ReviewStars';
import ReviewBox from '@/components/ReviewBox';

import { Link, useLocalSearchParams } from 'expo-router';  // For SelectButton resource_label
import { useResourceData } from '../../utils/ResourceContext'
import { ResourceRow, resourceRowToString } from '@/utils/ResourceRow';
import { getStraightDistanceInKilometers, useLocationData } from '@/utils/locationContext';

import colors from '../../utils/colors';
import {useNavigation } from 'expo-router'; 
import HeaderBackground from '@/components/CustomHeader';

export default function resource_page() {
  const resourceRows : ResourceRow[] | undefined = useResourceData();

  const local = useLocalSearchParams();  // FOR local.resourceRowId FROM ListBox.tsx param pass
  const myRowId = (typeof local.resourceRowId === 'string') ? (parseInt(local.resourceRowId)) : (parseInt(local.resourceRowId[0])) ;
  const row = (resourceRows) ? resourceRows.find((row) => row.id === myRowId) : null;
  const title = row?.title;

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
  const dist = getStraightDistanceInKilometers(row?.lat, row?.long, location?.coords.latitude, location?.coords.longitude);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "Full Details",
      // WARNING: headerStyle CONFLICTS WITH headerBackground! Dont use
      // headerStyle: {
      //   backgroundColor: colors.darkGreen,
      //   height: 150
      // },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'Roboto-Bold',
      },
      headerBackground: () => <HeaderBackground/>,
      headerShadowVisible: false,
    });
  });

  const rate = row?.rating ? row.rating : 0;
  return (
    <View style={{flex: 1, height: 100}}>
      <ScrollView>
      <Text style = {styles.header}>{title}</Text>
      <View style = {styles.rowContainer}>
        <Text style = {[styles.body, {width:30}]}>{row?.rating.toFixed(1)}</Text>
        <ReviewStars s={18} num={rate}/>
      </View>
      <Text style = {[styles.body, {fontStyle:'italic'}]}>Time open: {row?.time_open}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style = {[styles.rowContainer, {marginLeft: 14, marginRight: 14}]}>
          <MapButton texts="Directions" icon="directions" onClick={() => row?.maps_url ? Linking.openURL(row?.maps_url) : alert('No directions available')}/>
          <MapButton texts="Call  " icon="phone-alt" onClick={() => Linking.openURL('tel:' + row?.phone)}/>
          <MapButton texts="Save  " icon="bookmark" onClick={() => alert('Bookmark function not available')}/>
          <MapButton texts="Website" icon="external-link-alt" onClick={() => row?.website ? Linking.openURL(row?.website) : alert('No website available')}/>
        </View>
      </ScrollView>

      <View style={{ width: 450, height: 300}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ResImage uri={require('@/assets/images/FoodBank1.jpeg')}></ResImage>
        </ScrollView>
      </View>
      

      <View style={[{marginTop:15}]}>
        <Text style = {[styles.body, {width:300}, {marginBottom:10}]}>Address: {row?.address}</Text>
        <Text style = {[styles.body, {width:300}, {marginBottom:10}]}>Demographic: {row?.demographic}</Text>
        <Text style = {[styles.body, {width:300}, {marginBottom:10}]}>{dist} km away</Text>
      </View>

      <Text style = {[styles.header, {fontSize:20}]}>Review Summary</Text>

      <View style = {styles.rowContainer}>
        <View style = {styles.colContainer}>
          <Text style = {[styles.header, {fontSize:27}, {marginTop:0}, {width:45}]}>4.4</Text>

          <View style = {[{marginLeft:17}]}>
            <ReviewStars s={10} num={rate}/>
          </View>

          <Text style = {[styles.body, {width:30}, {marginLeft:30}, {fontSize:11}]}>(578)</Text>
        </View>

        <View style = {[styles.colContainer, {marginLeft:12}, {marginTop:1}]}>
          <ReviewBar len={230}/>
          <ReviewBar len={79}/>
          <ReviewBar len={35}/>
          <ReviewBar len={20}/>
          <ReviewBar len={10}/>
        </View>
      </View>

      <ReviewBox 
      name="Rendi Weber" 
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      uri={require('@/assets/images/FoodBank1.jpeg')}
      rating={rate}
      />

      </ScrollView>
    </View>
    
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    marginLeft: 24,
    color: '#37637C',
    fontSize: 32,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    width: 292,
    // borderColor : 'red',
    // borderWidth: 1,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  colContainer: {
    flexDirection: 'column',
  },
  body: {
    marginTop: 2,
    marginLeft: 24,
    color: '#7C3763',
    fontSize: 17,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    width: 350,
    // borderColor : 'red',
    // borderWidth: 1,
  },
});
