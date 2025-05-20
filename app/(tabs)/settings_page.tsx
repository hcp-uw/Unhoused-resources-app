import { Text, View, StyleSheet } from 'react-native';
import colors from '../colors'
import BasicButton from '@/components/BasicButton';
import { Link, router } from 'expo-router';


export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <BasicButton label="Resource Page" onPress={() => router.push('/resource_page')} />
      <BasicButton label="List Page" onPress={() => router.push('/list_page')}/>
      <BasicButton label="Test Page" onPress={() => router.push('/test_page')}/>
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
