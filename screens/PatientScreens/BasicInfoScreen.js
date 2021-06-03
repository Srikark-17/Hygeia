import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { HP, WP } from "../../config/responsive";
import appColors from "../../config/appColors";
import { auth, db } from "../../firebase";
import { useDispatch } from "react-redux";
import { setInfo } from "../../redux/actions/auth";

const BasicInfoScreen = () => {
  const [age, setAge] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [allergies, setAllergies] = useState("");
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const submitInfo = () => {
    if (
      age === "" ||
      height === "" ||
      weight === "" ||
      gender === "" ||
      phoneNumber === "" ||
      allergies === ""
    ) {
      alert(
        "Missing Info",
        "You have not filled out some information",
        [{ text: "Ok" }],
        { cancelable: false }
      );
    } else {
      const BMI = 703 * (weight / Math.pow(height, 2));
      const roundedBMI = Math.round(100 * BMI) / 100;
      db.collection("patients")
        .doc(user.uid)
        .set(
          {
            allergies: allergies,
            age: age,
            bmi: roundedBMI,
            gender: gender,
            height: height,
            phoneNumber: phoneNumber,
            weight: weight,
          },
          { merge: true }
        )
        .then(() => dispatch(setInfo(true)));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={basicInfoStyles.container}>
        <Text style={basicInfoStyles.title}>Basic Info</Text>
        <Text style={basicInfoStyles.subtitle}>
          Please enter some information about yourself
        </Text>
        <View style={basicInfoStyles.formContainer}>
          <TextInput
            placeholder="Age"
            style={basicInfoStyles.inputContainer}
            placeholderTextColor={appColors.darkGray}
            autoCorrect={false}
            value={age}
            onChangeText={(years) => setAge(years)}
            keyboardType="number-pad"
          />
          <TextInput
            placeholder="Height (in.)"
            style={basicInfoStyles.inputContainer}
            placeholderTextColor={appColors.darkGray}
            autoCorrect={false}
            value={height}
            keyboardType="decimal-pad"
            onChangeText={(inches) => setHeight(inches)}
          />
          <TextInput
            placeholder="Weight (lbs.)"
            style={basicInfoStyles.inputContainer}
            placeholderTextColor={appColors.darkGray}
            autoCorrect={false}
            value={weight}
            keyboardType="decimal-pad"
            onChangeText={(pounds) => setWeight(pounds)}
          />
          <TextInput
            placeholder="Gender"
            style={basicInfoStyles.inputContainer}
            placeholderTextColor={appColors.darkGray}
            autoCorrect={false}
            value={gender}
            onChangeText={(sex) => setGender(sex)}
          />
          <TextInput
            placeholder="Allergies"
            style={basicInfoStyles.inputContainer}
            placeholderTextColor={appColors.darkGray}
            autoCorrect={false}
            value={allergies}
            onChangeText={(allergies) => setAllergies(allergies)}
          />
          <TextInput
            placeholder="Phone Number"
            style={basicInfoStyles.inputContainer}
            placeholderTextColor={appColors.darkGray}
            autoCorrect={false}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(number) => setPhoneNumber(number)}
            textContentType="telephoneNumber"
          />
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={submitInfo}>
          <View style={basicInfoStyles.continueButton}>
            <Text style={basicInfoStyles.continueButtonText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BasicInfoScreen;

const basicInfoStyles = StyleSheet.create({
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
  formContainer: {
    height: HP(40),
    justifyContent: "space-between",
    marginTop: HP(5),
    marginBottom: HP(5.7),
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
  continueButton: {
    backgroundColor: appColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    width: WP(70.6),
    height: HP(6.25),
    marginVertical: HP(2.23),
    marginBottom: HP(4),
  },
  continueButtonText: {
    fontFamily: "Roboto_Bold",
    color: appColors.primary,
    fontSize: HP(2.23),
  },
});
