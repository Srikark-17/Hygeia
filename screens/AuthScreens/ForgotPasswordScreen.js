import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import appColors from "../../config/appColors";
import { HP, WP } from "../../config/responsive";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../firebase";

const sendForgotPasswordEmail = (email) => {
  if (email) {
    try {
      auth
        .sendPasswordResetEmail(email)
        .then(() =>
          Alert.alert(
            "Forgot Password",
            `The email should be at ${email} shortly!`
          )
        );
    } catch (error) {
      Alert.alert("Error", error);
    }
  } else {
    Alert.alert("Forgot Email", "You forgot to enter your email!");
  }
};

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  return (
    <View style={forgotPasswordStyles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <AntDesign name="left" size={26} style={forgotPasswordStyles.icon} />
      </TouchableOpacity>
      <Text style={forgotPasswordStyles.title}>Forgot Password</Text>
      <Text style={forgotPasswordStyles.description}>
        Enter the email that you registered with below!
      </Text>
      <TextInput
        onChangeText={(email) => setEmail(email)}
        style={forgotPasswordStyles.emailInput}
        placeholder="Email"
        placeholderTextColor={appColors.darkGray}
        autoCorrect={false}
      />
      <TouchableOpacity
        onPress={() => sendForgotPasswordEmail(email)}
        activeOpacity={0.7}
      >
        <View style={forgotPasswordStyles.button}>
          <Text style={forgotPasswordStyles.buttonText}>Send Email</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
};

export default ForgotPasswordScreen;

const forgotPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: HP(6),
    paddingRight: WP(4.83),
    backgroundColor: appColors.backgroundColor,
    paddingLeft: WP(4.83),
  },
  icon: {
    marginBottom: HP(3),
    color: appColors.primary,
  },
  title: {
    fontSize: HP(2.7),
    color: appColors.primary,
    fontFamily: "Roboto_Bold",
  },
  description: {
    fontSize: HP(2),
    marginTop: HP(1),
    marginBottom: HP(4),
    color: appColors.primary,
    fontFamily: "Roboto_Regularbb",
  },
  emailInput: {
    borderWidth: 1,
    borderRadius: 12,
    height: HP(5),
    width: WP(85),
    alignSelf: "center",
    paddingLeft: WP(3),
    color: appColors.primary,
    borderColor: appColors.secondary,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: HP(5),
    borderRadius: 12,
    alignSelf: "center",
    backgroundColor: appColors.secondary,
    width: WP(73),
    height: HP(6.25),
  },
  buttonText: {
    fontSize: HP(2.23),
    fontFamily: "Roboto_Bold",
    color: appColors.primary,
  },
});
