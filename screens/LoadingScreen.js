import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { WP, HP } from "../config/responsive";
import appColors from "../config/appColors";
import { StatusBar } from "expo-status-bar";

const LoadingScreen = () => {
  return (
    <View style={loadingStyles.container}>
      <Image
        source={require("../assets/Hygeia_Logo.png")}
        style={loadingStyles.logo}
      />
      <StatusBar style="light" />
    </View>
  );
};

export default LoadingScreen;

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: WP(75),
    height: HP(35),
  },
});
