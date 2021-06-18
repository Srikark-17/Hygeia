import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HP, WP } from "../../config/responsive";
import appColors from "../../config/appColors";
import { auth } from "../../firebase";
import { StatusBar } from "expo-status-bar";

const EmailVerificationScreen = () => {
  return (
    <View style={emailVerificationStyles.container}>
      <Text style={emailVerificationStyles.title}>Email Verification</Text>
      <Text style={emailVerificationStyles.description}>
        An email has been sent to the email you registered with to verify your
        email. Once verified, press Continue to move on.
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          auth.currentUser.emailVerified === true
            ? navigation.navigate("Choice Screen")
            : alert(
                "Error",
                "Your email has not been verified! Please try again"
              );
        }}
      >
        <View style={emailVerificationStyles.button}>
          <Text style={emailVerificationStyles.buttonText}>Continue</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
};

export default EmailVerificationScreen;

const emailVerificationStyles = StyleSheet.create({
  container: {
    backgroundColor: appColors.backgroundColor,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(3.9),
    color: appColors.primary,
    marginBottom: HP(1.6),
  },
  description: {
    textAlign: "center",
    color: appColors.darkGray,
    fontFamily: "Roboto_Regular",
    fontSize: HP(2),
    marginBottom: HP(2),
    width: WP(65),
  },
  button: {
    width: WP(58),
    height: HP(6.25),
    borderRadius: 12,
    backgroundColor: appColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: HP(2),
    top: HP(5),
  },
  buttonText: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(2),
    color: appColors.primary,
  },
});
