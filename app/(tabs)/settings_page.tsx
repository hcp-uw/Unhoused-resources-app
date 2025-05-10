import { Text, View, StyleSheet } from 'react-native';
import colors from '../colors'


export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>settings_page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
  },
});
