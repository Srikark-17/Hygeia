import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import appColors from "../../../config/appColors";
import { HP, WP } from "../../../config/responsive";
import { db } from "../../../firebase";

const DetailedPatientView = ({ route, navigation }) => {
  const { age, name, bmi, gender, phoneNumber, weight, height, uid } =
    route.params;
  const [areaOfDisease, setAreaOfDisease] = useState();
  const [newCough, setNewCough] = useState();
  const [bloodCough, setBloodCough] = useState();
  const [shortBreath, setShortBreath] = useState();
  const [chestPain, setChestPain] = useState();
  const [noTryWeightLoss, setNoTryWeightLoss] = useState();
  const [bonePain, setBonePain] = useState();
  const [headaches, setHeadaches] = useState();
  const [dysphonia, setDysphonia] = useState();
  const [covid, setCovid] = useState();
  const [scan, setScan] = useState();
  const [malignant, setMalignant] = useState();
  const [confidenceScore, setConfidenceScore] = useState();
  const [diseaseType, setDiseaseType] = useState();

  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return null;
  };

  db.collection("doctors")
    .doc("b7WTAXf6bEm27YWUXzep") // TODO:Replace this with user.uid when testing
    .collection("patients")
    .doc(uid)
    .get()
    .then((doc) => {
      setAreaOfDisease(doc.data().areaOfDisease);
      setNewCough(doc.data().newCough);
      setBloodCough(doc.data().bloodCough);
      setShortBreath(doc.data().shortBreath);
      setChestPain(doc.data().chestPain);
      setNoTryWeightLoss(doc.data().noTryWeightLoss);
      setBonePain(doc.data().bonePain);
      setHeadaches(doc.data().headaches);
      setDysphonia(doc.data().dysphonia);
      setCovid(doc.data().covid);
      setScan(doc.data().base64);
      setDiseaseType(doc.data().diseaseType);
      setConfidenceScore(doc.data().confidenceScore);
      setMalignant(doc.data().malignant);
    });

  return (
    <View style={detailedPatientStyles.container}>
      <Text style={detailedPatientStyles.title}>{name}'s Info</Text>
      <Text style={detailedPatientStyles.heading}>General Info</Text>
      <View style={detailedPatientStyles.genInfoOne}>
        <Text style={detailedPatientStyles.unhighlightedText}>
          Age: <Text style={detailedPatientStyles.highlightedText}>{age}</Text>
        </Text>
        <Text style={detailedPatientStyles.unhighlightedText}>
          Height (in):{" "}
          <Text style={detailedPatientStyles.highlightedText}>{height}</Text>
        </Text>
        <Text style={detailedPatientStyles.unhighlightedText}>
          Weight (lbs):{" "}
          <Text style={detailedPatientStyles.highlightedText}>{weight}</Text>
        </Text>
      </View>
      <View style={detailedPatientStyles.genInfoTwo}>
        <Text style={detailedPatientStyles.unhighlightedText}>
          BMI: <Text style={detailedPatientStyles.highlightedText}>{bmi}</Text>
        </Text>
        <Text style={detailedPatientStyles.unhighlightedText}>
          Gender:{" "}
          <Text style={detailedPatientStyles.highlightedText}>{gender}</Text>
        </Text>
        <View style={{ flexDirection: "column" }}>
          <Text style={detailedPatientStyles.unhighlightedText}>
            Phone Number:
          </Text>
          <Text style={detailedPatientStyles.highlightedText}>
            {formatPhoneNumber(phoneNumber)}
          </Text>
        </View>
      </View>
      <View
        style={{ alignSelf: "center", marginTop: HP(0.5), marginRight: WP(10) }}
      >
        <Text style={detailedPatientStyles.unhighlightedText}>
          Allergies:{" "}
          <Text style={detailedPatientStyles.highlightedText}>Peanut</Text>
        </Text>
      </View>
      <Text style={detailedPatientStyles.heading}>
        Area of Disease:{" "}
        <Text style={detailedPatientStyles.highlightedText}>
          {areaOfDisease}
        </Text>
      </Text>
      <Text style={detailedPatientStyles.heading}>Questionnaire Responses</Text>
      <View style={{ height: HP(23) }}>
        <ScrollView indicatorStyle="white">
          <View style={detailedPatientStyles.form}>
            <View style={detailedPatientStyles.question}>
              <Text style={detailedPatientStyles.questionText}>
                Have you developed a new cough that does not go away?
              </Text>
              <Text style={detailedPatientStyles.answer}>{newCough}</Text>
            </View>
            <View style={detailedPatientStyles.question}>
              <Text style={detailedPatientStyles.questionText}>
                Have you been coughing up blood, even a small amount?
              </Text>
              <Text style={detailedPatientStyles.answer}>{bloodCough}</Text>
            </View>
            <View style={detailedPatientStyles.question}>
              <Text style={detailedPatientStyles.questionText}>
                Have you had or are experiencing a shortness of breath?
              </Text>
              <Text style={detailedPatientStyles.answer}>{shortBreath}</Text>
            </View>
            <View style={detailedPatientStyles.question}>
              <Text style={detailedPatientStyles.questionText}>
                Have you had pain in your chest?
              </Text>
              <Text style={detailedPatientStyles.answer}>{chestPain}</Text>
            </View>
            <View style={detailedPatientStyles.question}>
              <Text style={detailedPatientStyles.questionText}>
                Have you lost weight without trying?
              </Text>
              <Text style={detailedPatientStyles.answer}>
                {noTryWeightLoss}
              </Text>
            </View>
            <View style={detailedPatientStyles.question}>
              <Text style={detailedPatientStyles.questionText}>
                Have you experienced bone pain?
              </Text>
              <Text style={detailedPatientStyles.answer}>{bonePain}</Text>
            </View>
            <View style={detailedPatientStyles.question}>
              <Text style={detailedPatientStyles.questionText}>
                Have you had headaches?
              </Text>
              <Text style={detailedPatientStyles.answer}>{headaches}</Text>
            </View>
            <View style={detailedPatientStyles.question}>
              <Text style={detailedPatientStyles.questionText}>
                Is your voice raspy, strained, or breathy?
              </Text>
              <Text style={detailedPatientStyles.answer}>{dysphonia}</Text>
            </View>
            <View style={detailedPatientStyles.question}>
              <Text style={detailedPatientStyles.questionText}>
                Have you experience any COVID-like symptoms (Fever, Cough,
                Fatigue, Body aches, Nausea, etc.)?
              </Text>
              <Text style={detailedPatientStyles.answer}>{covid}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      {scan ? (
        <View style={{ alignSelf: "flex-start" }}>
          <Text style={detailedPatientStyles.heading}>Disease Info</Text>
          <View style={detailedPatientStyles.diseaseContainer}>
            <View style={detailedPatientStyles.imageContainer}>
              <Text style={detailedPatientStyles.diseaseText}>
                Image of the scan
              </Text>
              <Image
                source={{ uri: "data:image/jpeg;base64," + scan }}
                style={{ width: WP(20), height: HP(9.2) }}
              />
            </View>
            <View>
              <View>
                <Text style={detailedPatientStyles.diseaseText}>
                  Malignant or Benign?
                </Text>
                <Text style={detailedPatientStyles.highlightedDiseaseText}>
                  {malignant == "Yes" ? "Malignant" : "Benign"},{" "}
                  {confidenceScore}
                </Text>
              </View>
              <View>
                <Text style={detailedPatientStyles.diseaseText}>
                  Disease Type:{" "}
                </Text>
                <Text style={detailedPatientStyles.highlightedDiseaseText}>
                  {diseaseType}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Detailed Upload Scan")}
              >
                <Text style={detailedPatientStyles.highlightedDiseaseText}>
                  Analyze another scan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Detailed Upload Scan")}
        >
          <Text style={detailedPatientStyles.highlightedDiseaseText}>
            Analyze a Scan
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DetailedPatientView;

const detailedPatientStyles = StyleSheet.create({
  container: {
    backgroundColor: appColors.backgroundColor,
    paddingTop: HP(9.82),
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(3.8),
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
  heading: {
    fontFamily: "Roboto_Medium",
    fontSize: HP(2.7),
    color: appColors.primary,
    alignSelf: "flex-start",
    marginLeft: WP(7),
    marginTop: HP(2),
    marginBottom: HP(1),
  },
  genInfoOne: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: WP(75),
    height: HP(4),
    marginRight: WP(9),
  },
  genInfoTwo: {
    flexDirection: "row",
    width: WP(75),
    marginRight: WP(10),
    justifyContent: "space-around",
  },
  unhighlightedText: {
    color: appColors.darkGray,
    fontSize: HP(1.67),
    fontFamily: "Roboto_Regular",
    marginLeft: WP(0.5),
  },
  highlightedText: {
    color: appColors.secondary,
  },
  question: {
    marginBottom: HP(2),
    width: WP(80),
  },
  questionText: {
    color: appColors.darkGray,
    fontFamily: "Roboto_Regular",
    fontSize: HP(1.67),
  },
  answer: {
    color: appColors.secondary,
    fontSize: HP(1.81),
    fontFamily: "Roboto_Regular",
  },
  diseaseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WP(85),
    marginLeft: WP(10),
  },
  imageContainer: {
    height: HP(13),
    alignItems: "center",
    justifyContent: "space-between",
  },
  diseaseText: {
    color: appColors.darkGray,
    fontFamily: "Roboto_Regular",
    fontSize: HP(1.84),
  },
  highlightedDiseaseText: {
    color: appColors.secondary,
    fontFamily: "Roboto_Regular",
    fontSize: HP(1.84),
    marginBottom: HP(1.5),
  },
});
