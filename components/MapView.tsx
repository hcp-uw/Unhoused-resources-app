import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const myKey = process.env.GOOGLE_MAPS_ANDROID_API_KEY 

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
