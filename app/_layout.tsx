import { Stack } from "expo-router";
import { ResourceProvider } from "../utils/ResourceContext"
// TODO: LEFTOFF: ResourceContext done, need to actually wrap the entire app now and give data!

export default function RootLayout() {
  return (
    <ResourceProvider>
      <Stack>
        {/* (tabs) dir: special directory -> display routes in bottom tab bar */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ResourceProvider>
  );
}
