import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import appColors from "../../config/appColors";
import { HP, WP } from "../../config/responsive";
import { auth, db } from "../../firebase";
import { useDispatch } from "react-redux";
import { setDoctor } from "../../redux/actions/auth";

const SetDoctorScreen = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const docArray = [];
  const [doctors, setDoctors] = useState();
  const dispatch = useDispatch();

  // Renders doctors
  const doctorNames = doctors?.map(function (doc) {
    return (
      <Picker.Item
        key={doc.docName}
        color={appColors.primary}
        label={doc.docName}
        value={doc.docName}
      />
    );
  });

  // Retrieves doctors from Firebase
  useEffect(() => {
    db.collection("doctors")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          docArray.push({ docName: doc.data().name, docUid: doc.data().uid });
        });
      })
      .then(() => {
        setDoctors(docArray);
      });
  }, []);

  // Sets doctor and pushes current patient's data to doctor's subcollection
  const handleSubmit = () => {
    const user = auth.currentUser;
    const doctorInfo = doctors.find(function (doctor, index) {
      if (doctor.docName === selectedDoctor) {
        return true;
      }
    });
    db.collection("patients")
      .doc(user.uid)
      .set({ doctor: selectedDoctor }, { merge: true })
      .then(() =>
        dispatch(
          setDoctor({
            doctorName: doctorInfo.docName,
            doctorUID: doctorInfo.docUid,
          })
        )
      );
    db.collection("patients")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const age = doc.data().age;
        const allergies = doc.data().allergies;
        const bmi = doc.data().bmi;
        const email = doc.data().email;
        const gender = doc.data().gender;
        const height = doc.data().height;
        const name = doc.data().name;
        const phoneNumber = doc.data().phoneNumber;
        const uid = doc.data().uid;
        const weight = doc.data().weight;
        db.collection("doctors")
          .doc(doctorInfo.docUid)
          .collection("patients")
          .doc(user.uid)
          .set(
            {
              age: age,
              allergies: allergies,
              bmi: bmi,
              email: email,
              gender: gender,
              height: height,
              name: name,
              phoneNumber: phoneNumber,
              uid: uid,
              weight: weight,
            },
            { merge: true }
          );
      });
  };

  return (
    <View style={setDoctorStyles.container}>
      <Text style={setDoctorStyles.title}>Set Doctor</Text>
      <Text style={setDoctorStyles.description}>Select your doctor!</Text>
      <Picker
        selectedValue={selectedDoctor}
        onValueChange={(doctor) => setSelectedDoctor(doctor)}
        mode="dropdown"
      >
        {doctorNames}
      </Picker>
      <TouchableOpacity activeOpacity={0.7} onPress={handleSubmit}>
        <View style={setDoctorStyles.button}>
          <Text style={setDoctorStyles.buttonText}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SetDoctorScreen;

const setDoctorStyles = StyleSheet.create({
  container: {
    backgroundColor: appColors.backgroundColor,
    paddingTop: HP(9.82),
    flex: 1,
  },
  title: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(4.7),
    color: appColors.primary,
    marginBottom: HP(2),
    alignSelf: "center",
  },
  description: {
    textAlign: "center",
    color: appColors.darkGray,
    fontFamily: "Roboto_Regular",
    fontSize: HP(2),
    marginBottom: HP(8),
    width: WP(80),
    alignSelf: "center",
  },
  button: {
    width: WP(58),
    height: HP(6.25),
    borderRadius: 12,
    backgroundColor: appColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: HP(15),
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(2),
    color: appColors.primary,
  },
});
