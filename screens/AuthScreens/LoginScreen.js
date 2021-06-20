import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import appColors from "../../config/appColors";
import { auth, db } from "../../firebase";
import * as Google from "expo-google-app-auth";
import * as firebase from "firebase";
import { StatusBar } from "expo-status-bar";
import { HP, WP } from "../../config/responsive";
import { setDoctor, setRole } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = auth.currentUser;

  const login = () => {
    auth.signInWithEmailAndPassword(email, password).then(() => {
      const userPatientRef = db.collection("patients").doc(user.uid);
      userPatientRef.get().then((doc) => {
        if (doc.exists) {
          db.collection("patients")
            .doc(user.uid)
            .get()
            .then((doc) => {
              if (doc.data().doctor) {
                db.collection("doctors")
                  .where("uid", "==", doc.data().doctor.doctorUID)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      dispatch(
                        setDoctor({
                          doctorName: doc.data().name,
                          doctorUID: doc.data().uid,
                        })
                      );
                    });
                  });
                dispatch(setRole(doc.data().userRole));
              }
            })
            .catch(() => {
              alert("Failure", "Could not find any records");
            });
        }
      });
    });
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
        alert(
          "Cancelled",
          "You have cancelled the Google Sign in",
          [{ text: "Ok" }],
          { cancelable: false }
        );
      }
    } catch (e) {
      alert(e);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={loginStyles.container}>
        <Text style={loginStyles.title}>Login</Text>
        <TouchableOpacity onPress={signInWithGoogleAsync}>
          <View style={loginStyles.googleLoginContainer}>
            <Image
              source={require("../../assets/googleLogo.png")}
              style={{
                width: WP(8.21),
                height: HP(3.79),
              }}
            />
            <Text style={loginStyles.googleText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
        <Text style={loginStyles.otherOptionText}>Or sign up with email</Text>
        <View style={loginStyles.formContainer}>
          <TextInput
            onChangeText={(emailText) => setEmail(emailText)}
            value={email}
            style={loginStyles.inputContainer}
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
            style={loginStyles.inputContainer}
            placeholder="Password"
            placeholderTextColor={appColors.darkGray}
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="password"
            textContentType="password"
            secureTextEntry={true}
          />
        </View>
        <Text
          style={loginStyles.forgotPasswordText}
          onPress={() => navigation.navigate("Forgot Password")}
        >
          Forgot Password?
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={login}>
          <View style={loginStyles.loginButton}>
            <Text style={loginStyles.loginText}>Login</Text>
          </View>
        </TouchableOpacity>
        <Text style={loginStyles.unhighlightedText}>
          Don't have an account?{" "}
          <Text
            style={loginStyles.highlightedText}
            onPress={() => navigation.navigate("Register")}
          >
            Sign up!
          </Text>
        </Text>
        <StatusBar style="light" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const loginStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: appColors.backgroundColor,
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
    fontFamily: "Roboto_Medium",
    color: appColors.primary,
  },
  otherOptionText: {
    fontFamily: "Roboto_Regular",
    color: appColors.darkGray,
    fontSize: HP(2),
    marginVertical: HP(3),
  },
  formContainer: {
    height: HP(13),
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
  forgotPasswordText: {
    color: appColors.secondary,
    fontSize: HP(2),
    fontFamily: "Roboto_Regular",
    marginTop: HP(1.8),
    marginRight: WP(15),
    alignSelf: "flex-end",
  },
  loginButton: {
    backgroundColor: appColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    width: WP(70.6),
    height: HP(6.25),
    marginVertical: HP(4),
    marginBottom: HP(4),
  },
  loginText: {
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
