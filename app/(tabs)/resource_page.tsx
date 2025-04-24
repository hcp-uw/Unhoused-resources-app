import React from 'react'
import {ScrollView, View, Text, StyleSheet} from 'react-native';
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

export default function resource_page() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("@/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Italic": require("@/assets/fonts/Roboto-Italic.ttf"),
    "Roboto_Condensed-ExtraBold": require("@/assets/fonts/Roboto_Condensed-ExtraBold.ttf"),
    "Roboto-Bold": require("@/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("@/assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("@/assets/fonts/Roboto-MediumItalic.ttf"),
  });

  return (
    <View>
      <ScrollView>
      <Text style = {styles.header}>Capitol Hill Community Lunch</Text>
      <View style = {styles.rowContainer}>
        <Text style = {[styles.body, {width:30}]}>4,4</Text>
        <ReviewStars s={18}/>
      </View>
      <Text style = {[styles.body, {fontStyle:'italic'}]}>10:00 AM - 3:00 PM</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style = {[styles.rowContainer, {marginLeft: 14}]}>
          <MapButton texts="Directions" icon="directions"/>
          <MapButton texts="Call  " icon="directions"/>
          <MapButton texts="Save  " icon="directions"/>
          <MapButton texts="Website" icon="directions"/>
        </View>
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ResImage uri={require('@/assets/images/FoodBank1.jpeg')}></ResImage>
      </ScrollView>

      <View style={[{marginTop:15}]}>
        <Text style = {[styles.body, {width:300}, {marginBottom:10}]}>509 10th Ave E, Seattle, WA 98102</Text>
        <Text style = {[styles.body, {width:300}, {marginBottom:10}]}>Seniors (65+)</Text>
        <Text style = {[styles.body, {width:300}, {marginBottom:10}]}>5 miles away</Text>
      </View>

      <Text style = {[styles.header, {fontSize:20}]}>Review Summary</Text>

      <View style = {styles.rowContainer}>
        <View style = {styles.colContainer}>
          <Text style = {[styles.header, {fontSize:27}, {marginTop:0}, {width:40}]}>4,4</Text>

          <View style = {[{marginLeft:17}]}>
            <ReviewStars s={10}/>
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
    borderColor : 'red',
    borderWidth: 1,
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
    borderColor : 'red',
    borderWidth: 1,
  },
});
