import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Account"
        options={{ headerShown: false, title: "Account" }}
      />
      <Stack.Screen
        name="Game"
        options={{ headerShown: false, title: "Game" }}
      />
      <Stack.Screen
        name="Home"
        options={{ headerShown: false, title: "Home" }}
      />
    </Stack>
  );
};

export default Layout;
