// PURPOSE: To test out Supabase.data fetching, type creation for ResourceRow, etc.

import { Text, View, StyleSheet } from "react-native";

import { supabase } from '@/utils/supabase';
import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants'  // process.env STOPS WORKING w/ external libs like react-native-maps
import { Alert } from 'react-native';

import { ResourceRow, returnValidatedResourceRow, returnValidatedResourceRowArr } from "@/components/ResourceRow";

export default function test_page() {
  // Consts
  const [resourceRows, setResourceRows] = useState<ResourceRow[] | undefined>(undefined)
  // const testEnv = process.env.TEST_ENV;
  const testEnv = Constants.expoConfig?.extra?.TEST_ENV || 'No env var found';

  useEffect(() => {
    const fetchName = async () => {
      // ! 'data' from supabase DB is of type any[]!
      // ! Need to validate & cast to custom-type ResourceRow!
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        //.limit(2)  // Gives 2 columns only
  
      if (error != null) {
        console.error("resource data fetch error!", error)
        Alert.alert("resource data fetch error!")
      } else if (data) {  // Shorthand: Checks that data isn't undef/null?
        // Dangerous cast from data:any[] to  rr:ResourceRow[]
        // ! WARNING: cast data as ResourceRow[] may be dangerous! May need to validate the cast!
        // DONT DO THIS: setResourceRows(data as ResourceRow[]);
        const rrArr: ResourceRow[] | undefined = returnValidatedResourceRowArr(data);

        setResourceRows(rrArr);  // State update schedule here!
        // console.log("JSON.stringified supabase.data : ", JSON.stringify(data))
      } else {
        Alert.alert("ERROR: unknown error for data")
      }
    }

    fetchName();
  }, []) // Like componentDidMount



  // Return
  return (
    <View>
      <Text>TestEnv: {testEnv}</Text>
      {/* CONDITIONAL RENDERING: Ternary operator - bool ? (1) : (2) -,  (1) returns JSX which is JavaScript-based HTML */}

      {/* {resourceRows ? (<Text>{resourceRows[0].id}</Text>) : (<Text> Loading: Fetching resourceRows... </Text>)} */}
      {resourceRows ? (resourceRows.map((row) => {return <View><Text> {row.title}</Text><Text>    {row.lat}</Text></View>;})) : (<Text> Loading: Fetching resourceRows... </Text>)}
    </View>
  )
}
