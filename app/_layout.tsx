import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* (tabs) dir: special directory -> display routes in bottom tab bar */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
