import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';

export default function getLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    getCurrentLocation();
  },[]);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("location permissions failed");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  return location;
  // location.coords.latitude
}

export function getStraightDistanceInKilometers(startLat : number, startLong : number, endLat : number, endLong : number) : number {
  // console.log("Lat & long", startLat, startLong, endLat, endLong)
  const dist = 111139 * Math.sqrt(Math.pow(startLat-endLat, 2) + Math.pow(startLong-endLong, 2))
  return dist;
}
