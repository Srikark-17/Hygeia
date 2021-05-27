import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg from "../../assets/SVG/Doctors";
import { StatusBar } from "expo-status-bar";
import appColors from "../../config/appColors";
import { HP, WP } from "../../config/responsive";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={welcomeStyles.container}>
      <Svg />
      <Text style={welcomeStyles.welcomeText}>Welcome to Hygeia</Text>
      <Text style={welcomeStyles.welcomeSubtext}>Let's get started!</Text>
      <View style={welcomeStyles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Register")}
        >
          <View style={welcomeStyles.registerContainer}>
            <Text style={welcomeStyles.registerText}>Register</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Login")}
        >
          <View style={welcomeStyles.loginContainer}>
            <Text style={welcomeStyles.loginText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

export default WelcomeScreen;

const welcomeStyles = StyleSheet.create({
  container: {
    backgroundColor: appColors.backgroundColor,
    flex: 1,
    alignItems: "center",
    paddingTop: HP(13.62),
  },
  welcomeText: {
    fontFamily: "JosefinSans_SemiBold",
    color: appColors.primary,
    fontSize: HP(3),
    marginTop: HP(10),
  },
  welcomeSubtext: {
    marginTop: HP(2.79),
    fontFamily: "Poppins_Regular",
    color: appColors.lightGray,
    fontSize: HP(2),
  },
  buttonContainer: {
    marginTop: HP(7),
    justifyContent: "space-between",
    height: HP(17.4),
  },
  registerContainer: {
    backgroundColor: appColors.secondary,
    width: WP(65.46),
    height: HP(7.59),
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: appColors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  registerText: {
    fontFamily: "JosefinSans_Regular",
    fontSize: HP(2.23),
    color: appColors.primary,
    textTransform: "uppercase",
  },
  loginContainer: {
    backgroundColor: appColors.primary,
    width: WP(65.46),
    height: HP(7.59),
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: appColors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  loginText: {
    fontFamily: "JosefinSans_Regular",
    fontSize: HP(2.23),
    textTransform: "uppercase",
    color: appColors.backgroundColor,
  },
});
