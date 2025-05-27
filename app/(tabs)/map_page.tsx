import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { useResourceData } from "@/utils/ResourceContext";
import { openMap } from "@/components/MapLinker";
import { useLocationData } from "@/utils/locationContext";

export default function App() {
    const [location, setLocation] = useState<Location.LocationObject | undefined>();
    const [region, setRegion] = useState<Region | null>(null);
    const [loading, setLoading] = useState(true);
    const resourceRows = useResourceData();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permission Denied",
                    "Enable location services to use this feature."
                );
                setLoading(false);
            }
            // Need to use locationContext, app loads very slowly without it
            //let userLocation = await Location.getCurrentPositionAsync({});
        })();
    }, []);

    let userLocation = useLocationData();
    useEffect(() => {
        if (!userLocation) {
            // Still loading
            return;
        }
        const { latitude, longitude } = userLocation.coords;

        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });

        setLoading(false);
    }, [location]);

    if (loading || !region) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                <Marker coordinate={region} title="You are here" />
                {resourceRows?.map((row) => (
                    <Marker
                        key={row.id}
                        coordinate={{ latitude: row.lat, longitude: row.long }}
                        title={row.title}
                        description={row.description}
                        onCalloutPress={() => {openMap({lat: row.lat, lng: row.long, label: row.title})}}
                    />
                ))}
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
