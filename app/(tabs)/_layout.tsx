import { Tabs } from 'expo-router';
import {ScrollView, View, Text, StyleSheet, Linking} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons' // Popular icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import colors from '../../utils/colors';

import { Image } from 'expo-image';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import HeaderBackground from '@/components/CustomHeader';

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("@/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Italic": require("@/assets/fonts/Roboto-Italic.ttf"),
    "Roboto_Condensed-ExtraBold": require("@/assets/fonts/Roboto_Condensed-ExtraBold.ttf"),
    "Roboto-Bold": require("@/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("@/assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("@/assets/fonts/Roboto-MediumItalic.ttf"),
  });

  const headerFontSizes=30
  return (
    <>
      <StatusBar backgroundColor='black'/>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#EFBC06',
          // NOTE: Overriding headerStyle conflicts with headerBackground & headerTitle somehow
          // Commented out as image CANNOT fit entire background with this for some reason
          // headerStyle: {
          //   height: '30%',
          // }, 
          headerBackground: () => (
            <HeaderBackground/>
          ),
          headerShadowVisible: false,
          headerTintColor: 'white',
          tabBarStyle: {
            backgroundColor: colors.darkGreen,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: headerFontSizes,
            fontFamily: 'Roboto-Bold'
          },
        }}
      >
        <Tabs.Screen name="index" options={{ 
          tabBarLabel: 'Home',  
          headerTitle: () => (
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: headerFontSizes, textAlign: 'center', marginTop: 0 }}>
            Unhoused Resources
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name='home-sharp' color={color} size={24} />
          ),
        }} />
        <Tabs.Screen name="map_page" options={{ 
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="map-marked-alt" size={24} color={color} />
          ),
        }} />
        <Tabs.Screen name="faq_page" options={{ 
          title: 'FAQ Page',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="frequently-asked-questions" size={24} color={color} />
          ),
        }} />
        <Tabs.Screen name="bookmarks_page" options={{ 
          title: 'Bookmarks',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="bookmarks" size={24} color={color} />
          ),
        }} />
        <Tabs.Screen name="helpers_page" options={{ 
          title: 'Helpers',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="hands-helping" size={24} color={color} />       
          ),
        }} />
        <Tabs.Screen name="settings_page" options={{ 
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="cog" size={24} color={color} />       
          ),
        }} />
        
      </Tabs>
    </>
  );
}
