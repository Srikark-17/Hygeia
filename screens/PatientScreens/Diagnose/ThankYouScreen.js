import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import appColors from "../../../config/appColors";
import { HP, WP } from "../../../config/responsive";

const ThankYouScreen = ({ navigation }) => {
  return (
    <View style={thankYouStyles.container}>
      <FontAwesome
        name="check-circle"
        size={HP(9)}
        color={appColors.secondary}
        style={thankYouStyles.icon}
      />
      <Text style={thankYouStyles.title}>Thank you!</Text>
      <Text style={thankYouStyles.description}>
        All of your data has been submitted to your doctor
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate(" ")}
      >
        <View style={thankYouStyles.button}>
          <Text style={thankYouStyles.buttonText}>Go to Home</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ThankYouScreen;

const thankYouStyles = StyleSheet.create({
  container: {
    backgroundColor: appColors.backgroundColor,
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  icon: {
    top: HP(6),
  },
  title: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(4),
    color: appColors.primary,
    marginBottom: HP(1),
    top: HP(7),
  },
  description: {
    textAlign: "center",
    color: appColors.darkGray,
    fontFamily: "Roboto_Regular",
    fontSize: HP(2),
    width: WP(50),
    top: HP(7),
  },
  button: {
    width: WP(58),
    height: HP(6.25),
    borderRadius: 12,
    backgroundColor: appColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: HP(8),
    top: HP(25.11),
  },
  buttonText: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(2),
    color: appColors.primary,
  },
});
