import React from 'react'
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import ListBox from '@/components/ListBox';

import { useLocalSearchParams } from 'expo-router';  // For SelectButton resource_label
import { useResourceData } from '../../utils/ResourceContext'
import { ResourceRow, resourceRowToString } from '@/components/ResourceRow';

export default function list_page() {
    const local = useLocalSearchParams();  // Ex. resource_label = Shelter
    const resourceRows : ResourceRow[] | undefined = useResourceData();
    console.log("PASSED FROM HOME_PAGE: local.resource_label: ", local.resource_label);

    // Example: filter resource list based on category
    // const filteredResources = ALL_RESOURCES.filter(
    //     (item) => item.category.toLowerCase() === category
    // );

    // !!! Console Error: Each child in a list should have a unique "key" prop -> If want to fix, use ResourceRow.id

    return (
        <ScrollView>
            {/* Feel free to delete things below. Its just to help you see an example of the values & displaying it on screen*/}
            <Text>Resource_label is {local.resource_label}</Text>
            {/* {resourceRows ? (<Text>{resourceRows[0].id}</Text>) : (<Text> Loading: Fetching resourceRows... </Text>)} */}
            {resourceRows ? (resourceRows.map((row) => {return <ListBox key={row.id} {...row}/>;})) : (<Text key="1"> Loading: ResourceRows is loading or may be null</Text>)}

            {/* <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/>
            <ListBox name='Capitol Hill Community Lunch' type='Meals' dem='Seniors' time='10:00 am - 3:00 pm' dist='5 miles away'/>
            <ListBox name='Roots Young Adult Center' type='Shelter' dem='Youth' time='10:00 pm - 5:00 pm' dist='10 miles away'/>
            <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/>
            <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/>
            <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/> */}
        </ScrollView>
        
    );
}