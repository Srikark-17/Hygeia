import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import appColors from "../../../config/appColors";
import { HP, WP } from "../../../config/responsive";
import { auth, db } from "../../../firebase";

const ThankYouScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const { doctor } = useSelector((state) => state.auth);
  const [docEmail, setDocEmail] = useState();
  useEffect(() => {
    db.collection("patients")
      .doc(user.uid)
      .get()
      .then(() => {
        db.collection("doctors")
          .where("name", "==", doctor.doctorName)
          .get()
          .then((doc) => setDocEmail(doc.data().email));
      });
  }, []);
  return (
    <View style={thankYouStyles.container}>
      <Text style={thankYouStyles.title}>Consult a doctor</Text>
      <Text style={thankYouStyles.description}>
        We urge that you call your doctor immediately to schedule an
        appointment. You could also email your doctor at {docEmail}.
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate(" ")}
      >
        <View style={thankYouStyles.button}>
          <Text style={thankYouStyles.buttonText}>Go to Home</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ThankYouScreen;

const thankYouStyles = StyleSheet.create({
  container: {
    backgroundColor: appColors.backgroundColor,
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  icon: {
    top: HP(6),
  },
  title: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(4),
    color: appColors.primary,
    marginBottom: HP(1),
    top: HP(7),
  },
  description: {
    textAlign: "center",
    color: appColors.darkGray,
    fontFamily: "Roboto_Regular",
    fontSize: HP(2),
    width: WP(63),
    top: HP(7),
  },
  button: {
    width: WP(58),
    height: HP(6.25),
    borderRadius: 12,
    backgroundColor: appColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: HP(8),
    top: HP(25.11),
  },
  buttonText: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(2),
    color: appColors.primary,
  },
});
