import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import appColors from "../../../config/appColors";
import { HP, WP } from "../../../config/responsive";
import { db } from "../../../firebase";
import Patient from "./components/Patient";

const PatientView = ({ navigation }) => {
  const patientArray = [];
  const [patArray, setPatArray] = useState();

  const patients = patArray?.map(function (patient) {
    return (
      <Patient
        key={patient.name}
        name={patient.name}
        age={patient.age}
        height={patient.height}
        weight={patient.weight}
        bmi={patient.bmi}
        gender={patient.gender}
        phoneNumber={patient.phoneNumber}
        onPress={() =>
          navigation.navigate("Detailed Patient View", {
            age: patient.age,
            name: patient.name,
            bmi: patient.bmi,
            gender: patient.gender,
            phoneNumber: patient.phoneNumber,
            weight: patient.weight,
            height: patient.height,
            uid: patient.uid,
          })
        }
      />
    );
  });

  useEffect(() => {
    db.collection("doctors")
      .doc("b7WTAXf6bEm27YWUXzep") // TODO:Replace this with user.uid when testing
      .collection("patients")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          patientArray.push({
            name: doc.data().name,
            age: doc.data().age,
            height: doc.data().height,
            weight: doc.data().weight,
            bmi: doc.data().bmi,
            gender: doc.data().gender,
            phoneNumber: doc.data().phoneNumber,
            uid: doc.data().uid,
          });
        });
      })
      .then(() => {
        setPatArray(patientArray);
      });
  }, []);

  return (
    <View style={patientStyles.container}>
      <Text style={patientStyles.title}>Patients</Text>
      <Text style={patientStyles.description}>
        Click on any patient to get an overview
      </Text>
      <View style={patientStyles.pContainer}>
        <ScrollView>{patients}</ScrollView>
      </View>
    </View>
  );
};

export default PatientView;

const patientStyles = StyleSheet.create({
  container: {
    backgroundColor: appColors.backgroundColor,
    paddingTop: HP(9.82),
    flex: 1,
    paddingHorizontal: WP(4.83),
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
    marginBottom: HP(4),
    width: WP(80),
    alignSelf: "center",
  },
  pContainer: {
    position: "absolute",
    left: WP(13),
    right: WP(0),
    bottom: HP(0),
    top: HP(23),
  },
});
