import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons' // Popular icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import colors from '../colors'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'yellow',
        headerStyle: {
          backgroundColor: colors.darkGreen,
        },
        headerShadowVisible: false,
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: colors.darkGreen,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ 
        title: 'Home',
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
  );
}
