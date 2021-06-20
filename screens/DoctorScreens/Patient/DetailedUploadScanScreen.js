import React from "react";
import { StyleSheet, Text, View } from "react-native";
import appColors from "../../../config/appColors";
import { HP, WP } from "../../../config/responsive";

const DetailedUploadScanScreen = () => {
  return (
    <View>
      <Text>DetailedUploadScanScreen</Text>
    </View>
  );
};

export default DetailedUploadScanScreen;

const reuploadImageStyles = StyleSheet.create({
  container: {
    backgroundColor: appColors.backgroundColor,
    paddingTop: HP(9.82),
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(3.8),
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
