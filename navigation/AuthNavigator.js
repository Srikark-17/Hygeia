import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/AuthScreens/LoginScreen";
import RegisterScreen from "../screens/AuthScreens/RegisterScreen";
import WelcomeScreen from "../screens/AuthScreens/WelcomeScreen";
import ForgotPasswordScreen from "../screens/AuthScreens/ForgotPasswordScreen";

const Auth = createStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Auth.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Auth.Screen name="Welcome" component={WelcomeScreen} />
        <Auth.Screen name="Login" component={LoginScreen} />
        <Auth.Screen name="Register" component={RegisterScreen} />
        <Auth.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      </Auth.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
