import React, { createContext, useContext, useEffect, useState } from 'react'
import * as Location from 'expo-location';

type LocationContextType = { location: Location.LocationObject | undefined };
const LocationContext = createContext<LocationContextType | undefined>(undefined);
type Props = { children: React.ReactNode };



const LocationProvider = ({ children } : Props) => {
  // 1.) Initial hooks
  const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined);

  // 2.1) OnStartup, call getCurrentLocation
  useEffect(() => {
    getCurrentLocation();
  }, []);  // [] -> like componentDidMount() checking on startup

  // 2.2) getCurrentLocation function
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error("ERROR: location permissions failed");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  // 3.) Return
  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  )
  // return location;
}

const useLocationData = () : Location.LocationObject | undefined => {
  const sharedValueContext = useContext(LocationContext);
  if (!sharedValueContext) {
    console.error("ERROR: useLocationData MUST be used within a provider")
  } 
  return sharedValueContext?.location;
}

export { LocationProvider, useLocationData };


// OTHER FUNCTIONS
// const location = useLocationData(); ERROR: must be used within a provider!!!
export function getStraightDistanceInKilometers(startLat: number | undefined, startLong: number | undefined, endLat : number | undefined, endLong : number | undefined) : number {
  if (typeof startLat !== "number" || typeof startLong !== "number" || typeof endLat !== "number" || typeof endLong !== "number") {
    console.error("ERROR: Given latitudes/longitudes in getDistance function are not valid numbers!", startLat, startLong, endLat, endLong)
    return -1;
  }
  // console.log("Lat & long", startLat, startLong, endLat, endLong)
  const dist = Math.floor(111139 * Math.sqrt(Math.pow(startLat-endLat, 2) + Math.pow(startLong-endLong, 2))) / 1000;
  return dist;
}
