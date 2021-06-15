import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import appColors from "../../config/appColors";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import DoctorWelcomeScreen from "../../screens/DoctorScreens/DoctorWelcomeScreen";

const DoctorTab = createBottomTabNavigator();
const inactiveColor = appColors.inactiveTab;
const tabcolor = appColors.primary;

const DoctorNavigator = () => {
  return (
    <NavigationContainer>
      <DoctorTab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBarOptions={{
          activeTintColor: appColors.primary,
          inactiveTintColor: inactiveColor,
          style: {
            backgroundColor: appColors.backgroundColor,
          },
        }}
      >
        <DoctorTab.Screen
          name=" "
          component={DoctorWelcomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="home"
                size={33}
                color={focused ? tabcolor : inactiveColor}
              />
            ),
          }}
        />
        <DoctorTab.Screen
          name="  "
          component={DoctorWelcomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="stethoscope"
                size={33}
                color={focused ? tabcolor : inactiveColor}
              />
            ),
          }}
        />
        <DoctorTab.Screen
          name="   "
          component={DoctorWelcomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person-sharp"
                size={28}
                color={focused ? tabcolor : inactiveColor}
              />
            ),
          }}
        />
      </DoctorTab.Navigator>
    </NavigationContainer>
  );
};

export default DoctorNavigator;
