import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import appColors from "../../../config/appColors";
import { HP, WP } from "../../../config/responsive";
import { Ionicons } from "@expo/vector-icons";

const PreparationScreen = ({ navigation }) => {
  return (
    <View style={preparationStyles.container}>
      <Ionicons
        name="ios-close-sharp"
        size={40}
        color={appColors.lightGray}
        style={{ bottom: HP(23), left: WP(38) }}
        onPress={() => navigation.navigate("Welcome")}
      />
      <Text style={preparationStyles.title}>Note</Text>
      <Text style={preparationStyles.description}>
        You will now be asked a couple of questions regarding the area you
        selected. Try not to leave the questionnaire after continuing
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
    marginBottom: HP(1),
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
  redirectText: {
    fontSize: HP(2),
    fontFamily: "Roboto_Regular",
    color: appColors.secondary,
    textAlign: "center",
    top: HP(5),
  },
});
