import { Text, View, StyleSheet } from 'react-native';
import colors from '../../utils/colors'


export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>bookmarks_page</Text>
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
