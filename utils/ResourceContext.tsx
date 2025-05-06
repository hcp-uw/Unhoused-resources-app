import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase';
import { Alert } from 'react-native';

// createContext(thing) -> value in ResourceContext.Provider is holding
// a very complicated type. It is holding one-time fetch of supabase rows
const ResourceContext = createContext();
// export default ResourceContext;

type Props = { children: React.ReactNode };

const ResourceProvider = ({ children }: Props) => {
  // 1) Data to load
  const [resourceData, setResourceData] = useState([]);  // shared value
  const [loading, setLoading] = useState(true);

  // 2.1) Function to fetch resourceData
  const fetchResourceData = async () => {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .limit(2);
      
      if (error != null) {
        Alert.alert("ERROR: Resource data error!");
        console.error("ERROR: Resource data error: ", error);
      } else {
        setResourceData(data[0]);
      }
  }
  // 2.2) OnStartup call function to fetch resourceData
  useEffect(() => {
    fetchResourceData();
  }, []);

  // 3) Return
  return (
    <ResourceContext.Provider value={{ resourceData }}>
      {children}
    </ResourceContext.Provider>
  )
}

const useResourceData = () => {
  const sharedValueContext = useContext(ResourceContext);
  if (sharedValueContext == null) {
    console.error("ERROR: useResourceData MUST be used within a provider")
  }
  return sharedValueContext;
}

export default { ResourceProvider, useResourceData };
