import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ChoiceScreen from "../screens/ChoiceScreen";
import BasicInfoScreen from "../screens/PatientScreens/BasicInfoScreen";

const Choice = createStackNavigator();

const ChoiceNavigator = () => {
  return (
    <NavigationContainer>
      <Choice.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Choice.Screen name="Choice_Screen" component={ChoiceScreen} />
        <Choice.Screen name="BasicInfo" component={BasicInfoScreen} />
      </Choice.Navigator>
    </NavigationContainer>
  );
};

export default ChoiceNavigator;
