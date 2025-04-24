import React, {useState} from 'react'
import {ScrollView, View, Pressable, Text, StyleSheet} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Bookmark() {
    const [bookmarked, setBookmarked] = useState(false);

    const handlePress = () => {
        setBookmarked((prev) => !prev);
    };

    return(
        <View>
            <Pressable onPress={handlePress} style={{borderWidth:0, width:40, height:50, justifyContent:'center'}}>
                <FontAwesome name={!bookmarked ? "bookmark-o" : "bookmark"} size={25} color={!bookmarked ? "#fff" : "#EFBC06"} opacity={0.9} marginLeft={6}/>
            </Pressable>
            
        </View>
    );
}