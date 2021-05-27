import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import appColors from "../../config/appColors";
import { auth } from "../../firebase";
import * as Google from "expo-google-app-auth";
import { StatusBar } from "expo-status-bar";
import * as firebase from "firebase";
import { HP, WP } from "../../config/responsive";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/auth";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const dispatch = useDispatch();

  const register = async () => {
    if (password == confirmPassword) {
      const response = await fetch("http://127.0.0.1:8080/register/encrypt", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
      });
      const json = await response.json();
      if (json["status"] === "success") {
        const apiPass = json["hashPass"];
        auth
          .createUserWithEmailAndPassword(email, apiPass)
          .then(() =>
            dispatch(setUser({ name: fullName, hash: apiPass, email: email }))
          );
      } else {
        Alert.alert("Failure", "Encryption Failed!");
      }
    } else {
      Alert.alert("Failure", "Passwords don't match!");
    }
  };

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "20701681345-4u6s5rhe6jh2gjnk068t5to3b0h8eul3.apps.googleusercontent.com",
        iosClientId:
          "20701681345-72ln1l2prflf9kr7mms4asva0716gfud.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );
        const googleProfileData = await auth.signInWithCredential(credential);
      } else {
        Alert.alert(
          "Cancelled",
          "You have cancelled the Google Sign in",
          [{ text: "Ok" }],
          { cancelable: false }
        );
      }
    } catch (e) {
      Alert.alert(e);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={registerStyles.container}>
        <Text style={registerStyles.title}>Register</Text>
        <TouchableOpacity onPress={signInWithGoogleAsync}>
          <View style={registerStyles.googleLoginContainer}>
            <Image
              source={require("../../assets/googleLogo.png")}
              style={{
                width: WP(8.21),
                height: HP(3.79),
              }}
            />
            <Text style={registerStyles.googleText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
        <Text style={registerStyles.otherOptionText}>
          Or sign up with email
        </Text>
        <View style={registerStyles.formContainer}>
          <TextInput
            onChangeText={(nameText) => setFullName(nameText)}
            value={fullName}
            placeholder="Full Name"
            placeholderTextColor={appColors.darkGray}
            style={registerStyles.inputContainer}
            autoCorrect={false}
          />
          <TextInput
            onChangeText={(emailText) => setEmail(emailText)}
            value={email}
            style={registerStyles.inputContainer}
            placeholderTextColor={appColors.darkGray}
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCompleteType="email"
            textContentType="emailAddress"
          />
          <TextInput
            onChangeText={(passwordText) => setPassword(passwordText)}
            value={password}
            style={registerStyles.inputContainer}
            placeholder="Password"
            placeholderTextColor={appColors.darkGray}
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="password"
            textContentType="password"
            secureTextEntry={true}
          />
          <TextInput
            onChangeText={(confirmPasswordText) =>
              setConfirmPassword(confirmPasswordText)
            }
            value={confirmPassword}
            style={registerStyles.inputContainer}
            placeholderTextColor={appColors.darkGray}
            placeholder="Confirm Password"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="password"
            textContentType="password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={register}>
          <View style={registerStyles.registerButton}>
            <Text style={registerStyles.registerText}>Register</Text>
          </View>
        </TouchableOpacity>
        <Text style={registerStyles.unhighlightedText}>
          Already have an account?{" "}
          <Text
            style={registerStyles.highlightedText}
            onPress={() => navigation.navigate("Login")}
          >
            Log in!
          </Text>
        </Text>
        <StatusBar style="light" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

const registerStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: appColors.backgroundColor,
    paddingTop: HP(12),
  },
  title: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(6.14),
    color: appColors.primary,
    marginBottom: HP(4),
  },
  googleLoginContainer: {
    width: WP(70.6),
    height: HP(6.81),
    borderWidth: 1,
    borderColor: appColors.lightGray,
    paddingHorizontal: WP(1.75),
    paddingVertical: HP(1),
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderRadius: 12,
  },
  googleText: {
    fontSize: HP(2),
    color: appColors.primary,
    fontFamily: "Roboto_Medium",
  },
  otherOptionText: {
    fontFamily: "Roboto_Regular",
    color: appColors.darkGray,
    fontSize: HP(2),
    marginVertical: HP(3),
  },
  formContainer: {
    height: HP(28),
    justifyContent: "space-between",
  },
  inputContainer: {
    width: WP(75),
    height: HP(5.75),
    borderRadius: 12,
    paddingVertical: HP(1.12),
    backgroundColor: appColors.primary,
    paddingLeft: WP(4.83),
    fontFamily: "Roboto_Regular",
    fontSize: HP(2),
  },
  registerButton: {
    backgroundColor: appColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    width: WP(70.6),
    height: HP(6.25),
    marginVertical: HP(2.23),
    marginBottom: HP(4),
  },
  registerText: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(2.23),
    color: appColors.primary,
    textTransform: "uppercase",
  },
  unhighlightedText: {
    fontFamily: "Roboto_Regular",
    fontSize: HP(2),
    color: appColors.primary,
  },
  highlightedText: {
    color: appColors.secondary,
  },
});
