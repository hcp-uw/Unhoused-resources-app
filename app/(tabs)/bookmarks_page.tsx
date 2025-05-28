import { Text, View, StyleSheet, ScrollView } from 'react-native';
import colors from '../../utils/colors'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ResourceRow } from '@/utils/ResourceRow';
import { useResourceData } from '@/utils/ResourceContext';
import { useEffect } from 'react';
import HeaderBackground from '@/components/CustomHeader';
import { useLocationData } from '@/utils/locationContext';
import ListBox from '@/components/ListBox';


export default function AboutScreen() {
    // const { resource_label } = useLocalSearchParams();  // Ex. resource_label = Shelter
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
          title: "Bookmarks",
          // WARNING: headerStyle CONFLICTS WITH headerBackground! Dont use
          // headerStyle: {
          //   backgroundColor: colors.darkGreen,
          //   height: 150
          // },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
          },
          headerBackground: () => <HeaderBackground />,
        });
      }, []);
    
    const location = useLocationData();
    return (
        <ScrollView>
            {/* NOTE: index != id. Index is made by .map, id is given my supabase retrieved id */}
            {resourceRows ? (resourceRows.filter((row, index) => {return index % 3 == 0}).map((row) => mapFct(row)))
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

function mapFct(row: ResourceRow) : React.JSX.Element {
  return <ListBox key={row.id} {...row}/>;
}
