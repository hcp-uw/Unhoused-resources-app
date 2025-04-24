import { StyleSheet, View, Pressable, Text } from 'react-native';

type Props = {
    len: number;
}
export default function ReviewBar({len}:Props){
    return(
        <View style={styles.emptyBar}>
            <View style={[styles.bar, {width:len}]}/>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyBar : {
        backgroundColor: '#D9D9D9',
        width: 246,
        height: 5,
        marginTop: 6.5,
        borderRadius: 21,
    },
    bar : {
        backgroundColor: '#EFBC06',
        width: 246,
        height: 5,
        borderRadius: 21,
    }
});