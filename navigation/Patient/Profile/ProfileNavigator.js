import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SetDoctorScreen from "../../../screens/PatientScreens/SetDoctorScreen";
import ProfileScreen from "../../../screens/PatientScreens/Profile/ProfileScreen";

const Profile = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Profile.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Profile.Screen name="Profile" component={ProfileScreen} />
      <Profile.Screen name="Set Doctor" component={SetDoctorScreen} />
    </Profile.Navigator>
  );
};

export default ProfileNavigator;
