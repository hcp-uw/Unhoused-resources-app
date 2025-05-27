import React, { useEffect } from 'react'
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import ListBox from '@/components/ListBox';

import { useLocalSearchParams, useNavigation } from 'expo-router';  // For SelectButton resource_label
import { useResourceData } from '../../utils/ResourceContext'
import { ResourceRow, resourceRowToString } from '@/components/ResourceRow';
import colors from '../colors';

const HeaderBackground = () => (
    <Image
      source={require('@/assets/images/header_bg.png')}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
    />
  );

export default function list_page() {
    const { resource_label } = useLocalSearchParams();  // Ex. resource_label = Shelter
    const navigation = useNavigation();
    const resourceRows : ResourceRow[] | undefined = useResourceData();
    // console.log("PASSED FROM HOME_PAGE: local.resource_label: ", resource_label);

    // Example: filter resource list based on category
    // const filteredResources = ALL_RESOURCES.filter(
    //     (item) => item.category.toLowerCase() === category
    // );

    // !!! Console Error: Each child in a list should have a unique "key" prop -> If want to fix, use ResourceRow.id
    const filteredAndSortedRow = filterAndSortResourceRows(resourceRows, resource_label);

    useEffect(() => {
        navigation.setOptions({
          title: resource_label ? String(resource_label) : "Resources",
          headerStyle: {
            backgroundColor: colors.darkGreen,
            height: 150
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28,
            fontFamily: 'Roboto-Bold',
          },
          headerBackground: () => <HeaderBackground />,
          headerShadowVisible: false,
        });
      }, [resource_label]);
    
    return (
        <ScrollView>
            {/* NOTE: index != id. Index is made by .map, id is given my supabase retrieved id */}
            {filteredAndSortedRow ? (filteredAndSortedRow.map((row, index) => {return <ListBox key={row.id} {...row} index={index}/>;})) : (<Text key="1"> Loading: ResourceRows is loading or may be null</Text>)}

            {/* <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/>
            <ListBox name='Capitol Hill Community Lunch' type='Meals' dem='Seniors' time='10:00 am - 3:00 pm' dist='5 miles away'/>
            <ListBox name='Roots Young Adult Center' type='Shelter' dem='Youth' time='10:00 pm - 5:00 pm' dist='10 miles away'/>
            <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/>
            <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/>
            <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/> */}
        </ScrollView>
        
    );
}

function filterAndSortResourceRows(resourceRows : ResourceRow[] | undefined, resource_label: string | string[]) {
    if (resourceRows === undefined) {
        console.error("ERROR: resourceRows cannot be filtered as it is undefined");
        return resourceRows;
    } else {
      if (resource_label !== "Hygiene" && resource_label !== "Food" && resource_label !== "Medical" && resource_label !== "Shelter") {
          console.error("ERROR: passed parameter resource_label does not equal ANY resource type given by home page buttons!")
          return resourceRows;
      }
      const filteredRow = resourceRows.filter((row, index) => {return row.resource_type === resource_label})
      // .sort((rowA, rowB) => {
      //   return rowA.
      // })
      return filteredRow;
    }
}

// TODO: create distsanceTo formula in ResourceRow.tsx?
    // const location = useLocationData();
    // const dist = (typeof location?.coords.latitude === 'number' && typeof location?.coords.longitude === 'number') 
    //     ? getStraightDistanceInKilometers(lat, long, location.coords.latitude, location.coords.longitude) : 'location is loading';