import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import appColors from "../../../config/appColors";
import { HP, WP } from "../../../config/responsive";
import { FontAwesome5 } from "@expo/vector-icons";
import { db, auth } from "../../../firebase";
import { useSelector } from "react-redux";

const ScreeningCauseScreen = ({ navigation }) => {
  const [covid, setCovid] = useState(false);
  const [lungCancer, setLungCancer] = useState(false);
  const selectedCards = [];
  const user = auth.currentUser;
  const { doctor } = useSelector((state) => state.auth);

  const choiceFunction = () => {
    if (covid) {
      db.collection("doctors")
        .doc(doctor.doctorUID)
        .collection("patients")
        .doc(user?.uid)
        .set({ disease: "COVID-19" }, { merge: true })
        .then(() => navigation.navigate("Prepare"));
    } else if (lungCancer) {
      db.collection("doctors")
        .doc(doctor.doctorUID)
        .collection("patients")
        .doc(user?.uid)
        .set({ disease: "Lung Cancer" }, { merge: true })
        .then(() => navigation.navigate("Prepare"));
    }
  };

  const covidToggle = () => {
    selectedCards.push(1);
    if (selectedCards[selectedCards.length - 1] == 1) {
      setLungCancer(false);
      setCovid((prev) => !prev);
    }
  };

  const lungCancerToggle = () => {
    selectedCards.push(2);
    if (selectedCards[selectedCards.length - 1] == 2) {
      setCovid(false);
      setLungCancer((prev) => !prev);
    }
  };

  return (
    <View style={screeningCauseStyles.container}>
      <Text style={screeningCauseStyles.title}>Disease Selection</Text>
      <Text style={screeningCauseStyles.description}>
        Choose why you are self-diagnosing today
      </Text>
      <ScrollView>
        <View style={screeningCauseStyles.cardContainer}>
          <TouchableOpacity onPress={covidToggle}>
            <View
              style={[
                covid
                  ? screeningCauseStyles.selectedCard
                  : screeningCauseStyles.individualCard,
              ]}
            >
              <FontAwesome5
                style={[
                  covid
                    ? screeningCauseStyles.selectedDisease
                    : screeningCauseStyles.disease,
                ]}
                name="virus"
                size={50}
              />
              <Text
                style={[
                  covid
                    ? screeningCauseStyles.selectedCardText
                    : screeningCauseStyles.cardText,
                ]}
              >
                COVID
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={lungCancerToggle}>
            <View
              style={[
                lungCancer
                  ? screeningCauseStyles.selectedCard
                  : screeningCauseStyles.individualCard,
              ]}
            >
              <FontAwesome5
                style={[
                  lungCancer
                    ? screeningCauseStyles.selectedDisease
                    : screeningCauseStyles.disease,
                ]}
                name="lungs-virus"
                size={50}
                color="black"
              />
              <Text
                style={[
                  lungCancer
                    ? screeningCauseStyles.selectedCardText
                    : screeningCauseStyles.cardText,
                ]}
              >
                Lung Cancer
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity activeOpacity={0.7} onPress={choiceFunction}>
        <View style={screeningCauseStyles.button}>
          <Text style={screeningCauseStyles.buttonText}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ScreeningCauseScreen;

const screeningCauseStyles = StyleSheet.create({
  container: {
    backgroundColor: appColors.backgroundColor,
    paddingTop: HP(9.82),
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(4.7),
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
  button: {
    width: WP(58),
    height: HP(6.25),
    borderRadius: 12,
    backgroundColor: appColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: HP(8),
  },
  buttonText: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(2),
    color: appColors.primary,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: WP(90),
  },
  selectedCard: {
    borderRadius: 12,
    width: WP(40),
    height: HP(17),
    marginBottom: HP(4),
    justifyContent: "center",
    alignItems: "center",
    borderColor: appColors.secondary,
    borderWidth: 1,
  },
  individualCard: {
    borderWidth: 1,
    borderColor: appColors.darkGray,
    borderRadius: 12,
    width: WP(40),
    height: HP(17),
    marginBottom: HP(4),
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDisease: {
    color: appColors.secondary,
    marginBottom: HP(2),
  },
  disease: {
    color: appColors.primary,
    marginBottom: HP(2),
  },
  selectedCardText: {
    color: appColors.secondary,
    fontFamily: "Roboto_Medium",
    fontSize: HP(2),
  },
  cardText: {
    color: appColors.primary,
    fontFamily: "Roboto_Medium",
    fontSize: HP(2),
  },
});
