import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ChoiceScreen from "../screens/ChoiceScreen";
import EmailVerificationScreen from "../screens/AuthScreens/EmailVerificationScreen";

const Choice = createStackNavigator();

const ChoiceNavigator = () => {
  return (
    <NavigationContainer>
      <Choice.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Choice.Screen
          name="Email Verification"
          component={EmailVerificationScreen}
        />
        <Choice.Screen name="Choice Screen" component={ChoiceScreen} />
      </Choice.Navigator>
    </NavigationContainer>
  );
};

export default ChoiceNavigator;
