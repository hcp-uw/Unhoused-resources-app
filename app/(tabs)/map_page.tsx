import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Region } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Enable location services to use this feature."
        );
        setLoading(false);
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = userLocation.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01, // Zoom level
        longitudeDelta: 0.01,
      });

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region || undefined} // Ensure it starts in the right place
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {region && <Marker coordinate={region} title="You are here" />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
