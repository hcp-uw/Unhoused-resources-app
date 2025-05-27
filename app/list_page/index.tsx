import React, { useEffect } from 'react'
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import ListBox from '@/components/ListBox';

import { useLocalSearchParams, useNavigation } from 'expo-router';  // For SelectButton resource_label
import { useResourceData } from '../../utils/ResourceContext'
import { ResourceRow, resourceRowToString } from '@/utils/ResourceRow';
import colors from '../colors';
import { getStraightDistanceInKilometers, useLocationData } from '@/utils/locationContext';
import { LocationObject } from 'expo-location';

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
    
    const location = useLocationData();
    return (
        <ScrollView>
            {/* NOTE: index != id. Index is made by .map, id is given my supabase retrieved id */}
            {resourceRows ? (resourceRows.filter((row) => filterFct(row, resource_label)).sort((rowA, rowB) => sortFct(rowA, rowB, location)).map((row) => mapFct(row))) 
              : (<Text key="1"> Loading: ResourceRows is loading or may be null</Text>)}

            {/* <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/>
            <ListBox name='Capitol Hill Community Lunch' type='Meals' dem='Seniors' time='10:00 am - 3:00 pm' dist='5 miles away'/>
            <ListBox name='Roots Young Adult Center' type='Shelter' dem='Youth' time='10:00 pm - 5:00 pm' dist='10 miles away'/>
            <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/>
            <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/>
            <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/> */}
        </ScrollView>
        
    );
}

function filterFct(row : ResourceRow, resource_label: string | string[]) {
  if (resource_label !== "Hygiene" && resource_label !== "Food" && resource_label !== "Medical" && resource_label !== "Shelter") {
    console.error("ERROR: passed parameter resource_label does not equal ANY resource type given by home page buttons!")
    return row;
  }
  return row.resource_type == resource_label;
}
function sortFct(rowA: ResourceRow, rowB: ResourceRow, location: LocationObject | undefined) {
  const startLat = location?.coords.latitude;
  const startLong = location?.coords.longitude;
  const distA = getStraightDistanceInKilometers(startLat, startLong, rowA.lat, rowA.long);
  const distB = getStraightDistanceInKilometers(startLat, startLong, rowB.lat, rowB.long);
  return distA - distB;
}
function mapFct(row: ResourceRow) : React.JSX.Element {
  return <ListBox key={row.id} {...row}/>;
}
