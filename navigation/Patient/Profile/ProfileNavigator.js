import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChangeDoctorScreen from "../../../screens/PatientScreens/Profile/ChangeDoctorScreen";
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
      <Profile.Screen name="ChangeDoctor" component={ChangeDoctorScreen} />
    </Profile.Navigator>
  );
};

export default ProfileNavigator;
