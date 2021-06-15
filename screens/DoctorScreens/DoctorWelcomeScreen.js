import React from "react";
import appColors from "../../config/appColors";
import { HP, WP } from "../../config/responsive";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg from "../../assets/SVG/Buildings";
import { StatusBar } from "expo-status-bar";

const DoctorWelcomeScreen = ({ navigation }) => {
  return (
    <View style={welcomeStyles.container}>
      <Text style={welcomeStyles.title}>Hello!</Text>
      <Svg />
      <Text style={welcomeStyles.description}>
        Hygeia makes diagnosing your patient simple and efficient! Choose an
        option to get started.
      </Text>
      <View style={welcomeStyles.buttonContainer}>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={welcomeStyles.button}>
            <Text style={welcomeStyles.buttonText}>View Patients</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={welcomeStyles.button}>
            <Text style={welcomeStyles.buttonText}>Analyze a Scan</Text>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

export default DoctorWelcomeScreen;

const welcomeStyles = StyleSheet.create({
  container: {
    backgroundColor: appColors.backgroundColor,
    paddingTop: HP(9.82),
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(6.14),
    color: appColors.primary,
    marginBottom: HP(8),
  },
  description: {
    marginTop: HP(10),
    textAlign: "center",
    color: appColors.darkGray,
    fontFamily: "Roboto_Regular",
    fontSize: HP(2),
    marginBottom: HP(8),
    width: WP(64.49),
  },
  buttonContainer: {
    width: WP(56.52),
    height: HP(15),
    justifyContent: "space-between",
  },
  button: {
    width: WP(56.52),
    height: HP(6.25),
    borderRadius: 12,
    backgroundColor: appColors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(2),
    color: appColors.primary,
  },
});
