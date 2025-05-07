import "dotenv/config";

export default {
  expo: {
    name: "Unhoused-Resources-Project",
    slug: "Unhoused-Resources-Project",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: false,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.unhousedresourcesproject",
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "This app needs access to your location to show nearby places.",
        NSLocationAlwaysAndWhenInUseUsageDescription: "This app needs access to your location in the background for navigation features.",
        NSLocationAlwaysUsageDescription: "This app needs access to your location in the background for navigation features.",
        ITSAppUsesNonExemptEncryption: false,
      },
      config: {
        googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY, // Loads API key from .env
      },
    },
    android: {
      package: "com.unhousedresourcesproject",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: "5c76eb1b-045c-45da-9e34-1c004c4f3292",
      },
      router: {
        origin: false,
      },
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      TEST_ENV: process.env.TEST_ENV,
    },
  },
};