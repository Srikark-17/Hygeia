import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../../screens/DoctorScreens/Profile/ProfileScreen";

const Profile = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Profile.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Profile.Screen name="Profile" component={ProfileScreen} />
    </Profile.Navigator>
  );
};

export default ProfileNavigator;
