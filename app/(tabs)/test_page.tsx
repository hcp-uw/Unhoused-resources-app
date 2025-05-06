import { Text, View, StyleSheet } from "react-native";

import { supabase } from '@/utils/supabase';
import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants'  // process.env STOPS WORKING w/ external libs like react-native-maps
import { Alert } from 'react-native';

export default function test_page() {
  // Consts
  const [shelterName, setShelterName] = useState('')
  // const testEnv = process.env.TEST_ENV;
  const testEnv = Constants.expoConfig?.extra?.TEST_ENV || 'No env var found';

  useEffect(() => {
    const fetchName = async () => {
      // ! 'data' from supabase DB is of type any[]!
      // ! Need to use complex new component Resource.ts!
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .limit(2)  // Gives 2 columns only
  
      if (error != null) {
        console.error("fetchName error!")
        Alert.alert("WOERIJWER")
        setShelterName('Error: shelterName not retrieved')
      } else {
        setShelterName(data[0].title);
        console.log("2 SHELTER ROWS : ", JSON.stringify(data))
        console.log("SHELTER NAME: ", shelterName)
      }
    }

    fetchName();
  }, []) // Like componentDidMount



  // Return
  return (
    <View>
      <Text>TestEnv: {testEnv}</Text>
      <Text>Sheltername: {shelterName}</Text>
    </View>
  )
}
