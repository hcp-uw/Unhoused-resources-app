import React from 'react'
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import ListBox from '@/components/ListBox';

import { useLocalSearchParams } from 'expo-router';  // For SelectButton resource_label

export default function list_page() {
    const local = useLocalSearchParams();  // Ex. resource_label = Shelter
    console.log("LISTPAGE: local.resource_label: ", local.resource_label);

    // Example: filter resource list based on category
    // const filteredResources = ALL_RESOURCES.filter(
    //     (item) => item.category.toLowerCase() === category
    // );

    return (
        <ScrollView>
            <Text>Resource_label is {local.resource_label}</Text>
            <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/>
            <ListBox name='Capitol Hill Community Lunch' type='Meals' dem='Seniors' time='10:00 am - 3:00 pm' dist='5 miles away'/>
            <ListBox name='Roots Young Adult Center' type='Shelter' dem='Youth' time='10:00 pm - 5:00 pm' dist='10 miles away'/>
            <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/>
            <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/>
            <ListBox name='King County Homeless Services' type='Housing' dem='Anyone' time='8:00 pm - 8:00 am' dist='3 miles away'/>
        </ScrollView>
        
    );
}