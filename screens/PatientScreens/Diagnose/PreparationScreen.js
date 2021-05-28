import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import appColors from "../../../config/appColors";
import { HP, WP } from "../../../config/responsive";

const PreparationScreen = ({ navigation }) => {
  return (
    <View style={preparationStyles.container}>
      <Text style={preparationStyles.title}>Note</Text>
      <Text style={preparationStyles.description}>
        Be sure to have an x-ray image of your lung on your phone. You may need
        it!
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Questionnaire")}
      >
        <View style={preparationStyles.button}>
          <Text style={preparationStyles.buttonText}>Continue</Text>
        </View>
      </TouchableOpacity>
      <Text style={preparationStyles.redirectText}>Go Back</Text>
    </View>
  );
};

export default PreparationScreen;

const preparationStyles = StyleSheet.create({
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
    width: WP(63.2),
  },
  button: {
    width: WP(58),
    height: HP(6.25),
    borderRadius: 12,
    backgroundColor: appColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: HP(2),
  },
  buttonText: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(2),
    color: appColors.primary,
  },
  redirectText: {
    fontSize: HP(2),
    fontFamily: "Roboto_Regular",
    color: appColors.secondary,
    textAlign: "center",
  },
});
