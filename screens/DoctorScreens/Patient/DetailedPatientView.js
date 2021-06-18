import React from "react";
import { StyleSheet, Text, View } from "react-native";
import appColors from "../../../config/appColors";
import { HP, WP } from "../../../config/responsive";

const DetailedPatientView = ({ route, navigation }) => {
  const { age, name, bmi, gender, phoneNumber, weight, height } = route.params;
  return (
    <View style={detailedPatientStyles.container}>
      <Text>{age}</Text>
      <Text>{height}</Text>
      <Text>{weight}</Text>
      <Text>{bmi}</Text>
      <Text>{name}</Text>
      <Text>{gender}</Text>
      <Text>{phoneNumber}</Text>
    </View>
  );
};

export default DetailedPatientView;

const detailedPatientStyles = StyleSheet.create({
  container: {
    backgroundColor: appColors.backgroundColor,
    paddingTop: HP(9.82),
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(4.7),
    color: appColors.primary,
    marginBottom: HP(2),
  },
  description: {
    textAlign: "center",
    color: appColors.darkGray,
    fontFamily: "Roboto_Regular",
    fontSize: HP(2),
    marginBottom: HP(8),
    width: WP(80),
  },
});
