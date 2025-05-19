// Unknown purpose imports
import 'react-native-url-polyfill/auto';
// No AsyncStorage for now, fix if needed in future
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants';
import { Alert } from 'react-native';

// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
const supabaseUrl = Constants.expoConfig?.extra?.SUPABASE_URL || undefined;
const supabaseAnonKey = Constants.expoConfig?.extra?.SUPABASE_ANON_KEY || undefined;

console.log("S URL", supabaseUrl);
console.log("S KEY", supabaseAnonKey);


if (supabaseUrl == undefined || supabaseAnonKey == undefined) {
  console.error("supabaseUrl or supabaseKey are undefined!");
  Alert.alert("supabaseUrl or supabaseKey are undefined!")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})