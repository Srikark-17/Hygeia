import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PatientWelcome from "../../screens/PatientScreens/PatientWelcome";
import BasicInfoScreen from "../../screens/PatientScreens/BasicInfoScreen";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import appColors from "../../config/appColors";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import DiagnoseNavigator from "./Diagnose/DiagnoseNavigator";
import ProfileNavigator from "./Profile/ProfileNavigator";

const Info = createStackNavigator();
const PatientTab = createBottomTabNavigator();
const inactiveColor = "#8E8E8E";
const tabcolor = appColors.primary;

const PatientNavigator = () => {
  const { basicInfo } = useSelector((state) => state.auth);

  if (basicInfo === true) {
    return (
      <NavigationContainer>
        <PatientTab.Navigator
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
          <PatientTab.Screen
            name=" "
            component={PatientWelcome}
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
          <PatientTab.Screen
            name="  "
            component={DiagnoseNavigator}
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
          <PatientTab.Screen
            name="   "
            component={ProfileNavigator}
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
        </PatientTab.Navigator>
      </NavigationContainer>
    );
  } else if (basicInfo === false) {
    return (
      <NavigationContainer>
        <Info.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Info.Screen name="Basic Info" component={BasicInfoScreen} />
        </Info.Navigator>
      </NavigationContainer>
    );
  }
};

export default PatientNavigator;
