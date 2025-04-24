import { View, StyleSheet } from 'react-native';
import { Image, ImageSource } from 'expo-image';

type Props = {
    uri: string;
}
export default function ResImage ({uri}: Props) {
    return (
        <View style={styles.rowContainer}>
            <Image source={uri} style={styles.img}/>

            <View style={styles.colContainer}>
                <Image source={uri} style={[styles.img, {height: 135}, {width:136}]}/>
                <Image source={uri} style={[styles.img, {height: 135}, {width:136}, {marginTop:10}]}/>
            </View>

            <Image source={uri} style={styles.img}/>
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        marginTop: 15,
        marginLeft: 20,
        flexDirection: 'row',

        borderColor : 'pink',
        borderWidth: 2,
      },
    colContainer: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'column',

        borderColor : 'pink',
        borderWidth: 2,
    },
    img : {
        width: 240,
        height: 282,
        borderRadius: 21,

        borderColor : 'lightblue',
        borderWidth: 3,
    }
});