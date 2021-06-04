import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import appColors from "../config/appColors";
import { HP, WP } from "../config/responsive";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setRole } from "../redux/actions/auth";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase";
import { useSelector } from "react-redux";

const ChoiceScreen = ({ navigation }) => {
  const [patientToggled, setPatientToggled] = useState(true);
  const [doctorToggled, setDoctorToggled] = useState(false);
  const selectedCards = [];
  const dispatch = useDispatch();
  const { reduxUser } = useSelector((state) => state.auth);
  const user = auth.currentUser;

  useEffect(() => {
    if (user && reduxUser) {
      user.updateProfile({
        displayName: reduxUser?.name,
        photoURL: reduxUser?.photourl,
      });
    }
  }, []);

  const choiceFunction = () => {
    if (patientToggled) {
      db.collection("patients")
        .doc(user?.uid)
        .set({ userRole: "Patient" }, { merge: true })
        .then(() => {
          db.collection("patients").doc(user?.uid)?.set(
            {
              email: reduxUser?.email,
              uid: user?.uid,
              name: reduxUser?.name,
            },
            { merge: true }
          );
        });
      dispatch(setRole("Patient"));
      navigation.navigate("BasicInfo");
    } else if (doctorToggled) {
      db.collection("doctors")
        .doc(user?.uid)
        .set({ userRole: "Doctor" }, { merge: true })
        .then(() => {
          db.collection("doctors").doc(user?.uid)?.set(
            {
              email: reduxUser?.email,
              uid: user?.uid,
              name: reduxUser?.name,
            },
            { merge: true }
          );
        });
      dispatch(setRole("Doctor"));
    }
  };

  const patientToggle = () => {
    selectedCards.push(1);
    if (selectedCards[selectedCards.length - 1] == 1) {
      setDoctorToggled(false);
      setPatientToggled((prev) => !prev);
    }
  };

  const doctorToggle = () => {
    selectedCards.push(2);
    if (selectedCards[selectedCards.length - 1] == 2) {
      setPatientToggled(false);
      setDoctorToggled((prev) => !prev);
    }
  };

  return (
    <View style={choiceStyles.container}>
      <Text style={choiceStyles.title} onPress={() => auth.signOut()}>
        Who are you?
      </Text>
      <Text style={choiceStyles.subtitle}>
        Choose below whether you’re a patient or a doctor
      </Text>
      <View style={choiceStyles.cardContainer}>
        <TouchableOpacity onPress={patientToggle}>
          <View
            style={[
              patientToggled
                ? choiceStyles.selectedBicard
                : choiceStyles.normalBicard,
            ]}
          >
            <Ionicons
              name="person-sharp"
              size={52}
              color={patientToggled ? appColors.secondary : "#8E8E8E"}
            />
            <View>
              <Text
                style={[
                  patientToggled
                    ? choiceStyles.selectedBicardText
                    : choiceStyles.normalBicardText,
                ]}
              >
                I'm a Patient
              </Text>
              <Text style={choiceStyles.bicardDescription}>
                A patient is a person who gets diagnosed by a doctor or a person
                who receives medical treatment
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={doctorToggle}>
          <View
            style={[
              doctorToggled
                ? choiceStyles.selectedBicard
                : choiceStyles.normalBicard,
            ]}
          >
            <FontAwesome5
              name="stethoscope"
              size={52}
              color={doctorToggled ? appColors.secondary : "#8E8E8E"}
            />
            <View>
              <Text
                style={[
                  doctorToggled
                    ? choiceStyles.selectedBicardText
                    : choiceStyles.normalBicardText,
                ]}
              >
                I'm a Doctor
              </Text>
              <Text style={choiceStyles.bicardDescription}>
                A doctor is a person who diagnoses a patient or a person who
                gives medical treatment
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={choiceFunction}>
        <View style={choiceStyles.continueButton}>
          <Text style={choiceStyles.continueButtonText}>Continue</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
};

export default ChoiceScreen;

const choiceStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.backgroundColor,
    paddingTop: HP(10.16),
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(3.91),
    color: appColors.primary,
    marginBottom: HP(1.4),
  },
  subtitle: {
    fontFamily: "Roboto_Regular",
    fontSize: HP(2),
    color: appColors.darkGray,
    width: WP(67.87),
    textAlign: "center",
  },
  cardContainer: {
    height: HP(30),
    marginTop: HP(10),
    marginBottom: HP(5),
    justifyContent: "space-between",
  },
  selectedBicard: {
    width: WP(81.16),
    height: HP(13.95),
    borderRadius: 12,
    backgroundColor: appColors.backgroundColor,
    paddingVertical: HP(2.23),
    paddingHorizontal: WP(4.83),
    borderWidth: 1,
    borderColor: appColors.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedBicardText: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(2),
    color: appColors.secondary,
    marginLeft: WP(4.83),
  },
  normalBicard: {
    width: WP(81.16),
    height: HP(13.95),
    borderRadius: 12,
    backgroundColor: appColors.backgroundColor,
    paddingVertical: HP(2.23),
    paddingHorizontal: WP(4.83),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: appColors.darkGray,
  },
  normalBicardText: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(2),
    color: appColors.darkGray,
    marginLeft: WP(4.83),
  },
  bicardDescription: {
    fontFamily: "Roboto_Regular",
    fontSize: HP(1.34),
    color: appColors.darkGray,
    width: WP(50.48),
    marginLeft: WP(4.83),
    marginTop: HP(1.3),
  },
  continueButton: {
    width: WP(75.6),
    height: HP(6.25),
    borderRadius: 12,
    backgroundColor: appColors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    fontFamily: "Roboto_Bold",
    color: appColors.primary,
    fontSize: HP(2.23),
  },
});
