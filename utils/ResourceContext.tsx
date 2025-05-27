import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase';
import { Alert } from 'react-native';
import { ResourceRow, returnValidatedResourceRowArr } from '@/utils/ResourceRow';

// createContext(thing) -> value in ResourceContext.Provider is holding
// a complex custom type (i.e. ResourceRow). It is holding one-time fetch of supabase rows

// Need ResourceContextType as ResourceRow[] is NOT a type but an arr of values!
type ResourceContextType = {
  resourceRows: ResourceRow[] | undefined,
};
const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

type Props = { children: React.ReactNode };

const ResourceProvider = ({ children }: Props) => {
  // 1) Data to load
  const [resourceRows, setResourceRows] = useState<ResourceRow[] | undefined>(undefined);  // shared value

  // 2.1) OnStartup call function to fetch resourceData
  useEffect(() => {
    const fetchResourceData = async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        //.limit(2)  // Gives 2 columns only
        
        if (error != null) {
          console.error("resource data fetch error!", error);
          Alert.alert("resource data fetch error!");
        } else if (data) {  // Shorthand: Checks that data isn't undef/null?
          // Dangerous cast from data:any[] to  rr:ResourceRow[]
          // ! WARNING: cast data as ResourceRow[] may be dangerous! May need to validate the cast!
          // DONT DO THIS: setResourceRows(data as ResourceRow[]);
          const rrArr: ResourceRow[] | undefined = returnValidatedResourceRowArr(data);
          setResourceRows(rrArr);  // State update schedule here!
          //console.log("JSON.stringified supabase.data : ", JSON.stringify(data))
        } else {
          Alert.alert("ERROR: unknown error for data");
        }
    }
    fetchResourceData();
  }, []);  // [] -> like componentDidMount() checking on startup

  // 3) Return
  return (
    <ResourceContext.Provider value={{ resourceRows }}>
      {children}
    </ResourceContext.Provider>
  )
}

const useResourceData = (): ResourceRow[] | undefined  => {
  const sharedValueContext = useContext(ResourceContext);
  if (!sharedValueContext) {
    console.error("ERROR: useResourceData MUST be used within a provider")
  }
  return sharedValueContext?.resourceRows;
}

export { ResourceProvider, useResourceData };
