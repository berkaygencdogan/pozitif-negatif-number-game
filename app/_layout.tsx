import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="Account">
      <Stack.Screen
        name="Account"
        options={{ headerShown: false, title: "Account" }}
      />
      <Stack.Screen
        name="Game"
        options={{ headerShown: false, title: "Game" }}
      />
      <Stack.Screen
        name="SinglePlayerScreen"
        options={{ headerShown: false, title: "SinglePlayerScreen" }}
      />
      <Stack.Screen
        name="MultiPlayerScreen"
        options={{ headerShown: false, title: "MultiPlayerScreen" }}
      />
      <Stack.Screen
        name="LocalMultiPlayerScreen"
        options={{ headerShown: false, title: "LocalMutltiPlayerScreen" }}
      />
      <Stack.Screen
        name="Home"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen
        name="Settings"
        options={{ headerShown: false, title: "Settings" }}
      />
      <Stack.Screen
        name="BestPlayer"
        options={{ headerShown: false, title: "BestPlayer" }}
      />
    </Stack>
  );
};

export default Layout;
