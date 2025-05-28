import { StyleSheet, View, Pressable, Text, Image, ImageSourcePropType } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from '../utils/colors';
import { router } from 'expo-router';

type Props = {
  label: string;
  source: ImageSourcePropType;
}

export default function SelectButton({ label, source }: Props) {
  return (
      <View style={styles.buttonContainer}>
        <Pressable 
            style={styles.button} 
            // router.navigate: If label="Hygiene", passes resoure_label to INDEX/HOMEPAGE in useLocalSearchParams
            onPress={() => router.navigate(`/list_page?resource_label=${label}`)}>
            <View>
                <Text style={styles.buttonLabel}>{label}</Text>
            </View>
            <View style={styles.buttonImgContainer}>
              <Image 
                  source={source}
                  resizeMode="contain"
                  style={styles.buttonImg}
              />
            </View>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '47%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    backgroundColor: colors.navyBlue,
    position: 'relative',
    flex: 1
  },
  buttonLabel: {
    position: 'absolute',
    color: 'white',
    fontSize: 25,
    flexWrap: 'wrap',
    width: '80%',
    fontWeight: 'bold',
    marginTop: '6%',
    marginLeft: '8%',
    flexShrink: 1,
    textAlign: 'left',
    zIndex: 2
  },
  buttonImg: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  buttonImgContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
  }
});
