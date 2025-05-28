import React from 'react'
import { Image } from 'expo-image';
import colors from '@/utils/colors';

export default function HeaderBackground() {
  return (
    // NOTE: Image from expo-image!
    <Image
      source={require('@/assets/images/header_bg2.png')}
      style={{
        width: '100%',
        height: '100%',
        // borderColor: 'black',
        // borderWidth: 2,
      }}
      contentFit='fill'
    />
  )
}

// TODO: Finish this function for all headers!
export const getCustomHeaderOptions = () => {
  const headerFontSizes=30

  return {
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
  };
};
