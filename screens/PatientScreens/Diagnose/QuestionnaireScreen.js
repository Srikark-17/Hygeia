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
import RadioButtonRN from "radio-buttons-react-native";
import { auth, db } from "../../../firebase";
import { useSelector } from "react-redux";

const QuestionnaireScreen = ({ navigation }) => {
  const [newCough, setNewCough] = useState();
  const [bloodCough, setBloodCough] = useState();
  const [shortBreath, setShortBreath] = useState();
  const [chestPain, setChestPain] = useState();
  const [noTryWeightLoss, setNoTryWeightLoss] = useState();
  const [bonePain, setBonePain] = useState();
  const [headaches, setHeadaches] = useState();
  const [dysphonia, setDysphonia] = useState();
  const [covid, setCovid] = useState();
  const { doctor } = useSelector((state) => state.auth);
  const user = auth.currentUser;

  const data = [
    {
      label: "Yes",
      accessibilityLabel: "Yes",
    },
    {
      label: "No",
      accessibilityLabel: "No",
    },
  ];

  const handleSubmit = () => {
    db.collection("doctors")
      .doc(doctor.doctorUID)
      .collection("patients")
      .doc(user.uid)
      .set(
        {
          newCough: newCough,
          bloodCough: bloodCough,
          shortBreath: shortBreath,
          chestPain: chestPain,
          noTryWeightLoss: noTryWeightLoss,
          bonePain: bonePain,
          headaches: headaches,
          dysphonia: dysphonia,
          covid: covid,
        },
        { merge: true }
      )
      .then(() => navigation.navigate("Thank You"));
  };

  return (
    <View style={questionnaireStyles.container}>
      <Text style={questionnaireStyles.title}>Questionnaire</Text>
      <Text style={questionnaireStyles.description}>
        Fill out the questions below!
      </Text>
      <ScrollView indicatorStyle="white">
        <View style={questionnaireStyles.form}>
          <View style={questionnaireStyles.question}>
            <Text style={questionnaireStyles.questionText}>
              Have you developed a new cough that does not go away?
            </Text>
            <RadioButtonRN
              data={data}
              selectedBtn={(choice) => setNewCough(choice.label)}
              boxActiveBgColor={appColors.backgroundColor}
              boxDeactiveBgColor={appColors.backgroundColor}
              box={false}
              activeColor={appColors.secondary}
              animationTypes={["pulse"]}
              textStyle={{
                color: appColors.primary,
                fontFamily: "Roboto_Regular",
                fontSize: HP(2),
              }}
            />
          </View>
          <View style={questionnaireStyles.question}>
            <Text style={questionnaireStyles.questionText}>
              Have you been coughing up blood, even a small amount?
            </Text>
            <RadioButtonRN
              data={data}
              selectedBtn={(choice) => setBloodCough(choice.label)}
              boxActiveBgColor={appColors.backgroundColor}
              boxDeactiveBgColor={appColors.backgroundColor}
              box={false}
              activeColor={appColors.secondary}
              animationTypes={["pulse"]}
              textStyle={{
                color: appColors.primary,
                fontFamily: "Roboto_Regular",
                fontSize: HP(2),
              }}
            />
          </View>
          <View style={questionnaireStyles.question}>
            <Text style={questionnaireStyles.questionText}>
              Have you had or are experiencing a shortness of breath?
            </Text>
            <RadioButtonRN
              data={data}
              selectedBtn={(choice) => setShortBreath(choice.label)}
              boxActiveBgColor={appColors.backgroundColor}
              boxDeactiveBgColor={appColors.backgroundColor}
              box={false}
              activeColor={appColors.secondary}
              animationTypes={["pulse"]}
              textStyle={{
                color: appColors.primary,
                fontFamily: "Roboto_Regular",
                fontSize: HP(2),
              }}
            />
          </View>
          <View style={questionnaireStyles.question}>
            <Text style={questionnaireStyles.questionText}>
              Have you had pain in your chest?
            </Text>
            <RadioButtonRN
              data={data}
              selectedBtn={(choice) => setChestPain(choice.label)}
              boxActiveBgColor={appColors.backgroundColor}
              boxDeactiveBgColor={appColors.backgroundColor}
              box={false}
              activeColor={appColors.secondary}
              animationTypes={["pulse"]}
              textStyle={{
                color: appColors.primary,
                fontFamily: "Roboto_Regular",
                fontSize: HP(2),
              }}
            />
          </View>
          <View style={questionnaireStyles.question}>
            <Text style={questionnaireStyles.questionText}>
              Have you lost weight without trying?
            </Text>
            <RadioButtonRN
              data={data}
              selectedBtn={(choice) => setNoTryWeightLoss(choice.label)}
              boxActiveBgColor={appColors.backgroundColor}
              boxDeactiveBgColor={appColors.backgroundColor}
              box={false}
              activeColor={appColors.secondary}
              animationTypes={["pulse"]}
              textStyle={{
                color: appColors.primary,
                fontFamily: "Roboto_Regular",
                fontSize: HP(2),
              }}
            />
          </View>
          <View style={questionnaireStyles.question}>
            <Text style={questionnaireStyles.questionText}>
              Have you experienced bone pain?
            </Text>
            <RadioButtonRN
              data={data}
              selectedBtn={(choice) => setBonePain(choice.label)}
              boxActiveBgColor={appColors.backgroundColor}
              boxDeactiveBgColor={appColors.backgroundColor}
              box={false}
              activeColor={appColors.secondary}
              animationTypes={["pulse"]}
              textStyle={{
                color: appColors.primary,
                fontFamily: "Roboto_Regular",
                fontSize: HP(2),
              }}
            />
          </View>
          <View style={questionnaireStyles.question}>
            <Text style={questionnaireStyles.questionText}>
              Have you had headaches?
            </Text>
            <RadioButtonRN
              data={data}
              selectedBtn={(choice) => setHeadaches(choice.label)}
              boxActiveBgColor={appColors.backgroundColor}
              boxDeactiveBgColor={appColors.backgroundColor}
              box={false}
              activeColor={appColors.secondary}
              animationTypes={["pulse"]}
              textStyle={{
                color: appColors.primary,
                fontFamily: "Roboto_Regular",
                fontSize: HP(2),
              }}
            />
          </View>
          <View style={questionnaireStyles.question}>
            <Text style={questionnaireStyles.questionText}>
              Is your voice raspy, strained, or breathy?
            </Text>
            <RadioButtonRN
              data={data}
              selectedBtn={(choice) => setDysphonia(choice.label)}
              boxActiveBgColor={appColors.backgroundColor}
              boxDeactiveBgColor={appColors.backgroundColor}
              box={false}
              activeColor={appColors.secondary}
              animationTypes={["pulse"]}
              textStyle={{
                color: appColors.primary,
                fontFamily: "Roboto_Regular",
                fontSize: HP(2),
              }}
            />
          </View>
          <View style={questionnaireStyles.question}>
            <Text style={questionnaireStyles.questionText}>
              Have you experience any COVID-like symptoms (Fever, Cough,
              Fatigue, Body aches, Nausea, etc.)?
            </Text>
            <RadioButtonRN
              data={data}
              selectedBtn={(choice) => setCovid(choice.label)}
              boxActiveBgColor={appColors.backgroundColor}
              boxDeactiveBgColor={appColors.backgroundColor}
              box={false}
              activeColor={appColors.secondary}
              animationTypes={["pulse"]}
              textStyle={{
                color: appColors.primary,
                fontFamily: "Roboto_Regular",
                fontSize: HP(2),
              }}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity activeOpacity={0.7} onPress={handleSubmit}>
        <View style={questionnaireStyles.button}>
          <Text style={questionnaireStyles.buttonText}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default QuestionnaireScreen;

const questionnaireStyles = StyleSheet.create({
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
    marginBottom: HP(1),
  },
  description: {
    textAlign: "center",
    color: appColors.darkGray,
    fontFamily: "Roboto_Regular",
    fontSize: HP(2),
    marginBottom: HP(2),
    width: WP(80),
  },
  question: {
    marginBottom: HP(2),
    width: WP(80),
  },
  questionText: {
    color: appColors.primary,
    fontFamily: "Roboto_Regular",
    fontSize: HP(2),
  },
  button: {
    width: WP(58),
    height: HP(6.25),
    borderRadius: 12,
    backgroundColor: appColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: HP(8),
    top: HP(2),
  },
  buttonText: {
    fontFamily: "Roboto_Bold",
    fontSize: HP(2),
    color: appColors.primary,
  },
});
