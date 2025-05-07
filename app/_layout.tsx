import { Stack } from "expo-router";
import { ResourceProvider } from "../utils/ResourceContext"
// TODO: LEFTOFF: ResourceContext done, need to actually wrap the entire app now and give data!

export default function RootLayout() {
  return (
    <Stack>
      {/* (tabs) dir: special directory -> display routes in bottom tab bar */}
      <ResourceProvider>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </ResourceProvider>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
