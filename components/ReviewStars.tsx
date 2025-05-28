import { StyleSheet, View, Pressable, Text } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
    s: number;
    num: number;
}
export default function ReviewStar({s, num}:Props){
  num = Math.round(num);
    return (
      <View style = {styles.rowContainer}>
        {Array.from({length:num}).map((_, index)=>
          <AntDesign name="star" key={index} size={s} color="#EFBC06" marginTop={3} marginRight={1.5}/>
        )}
        {Array.from({length:5-num}).map((_, index)=>
          <AntDesign name="star" key={index} size={s} color="#C2C1BA" marginTop={3} marginRight={1.5}/>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
      flexDirection: 'row',
    }
});