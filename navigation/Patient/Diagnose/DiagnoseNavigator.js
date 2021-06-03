import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ScreeningCauseScreen from "../../../screens/PatientScreens/Diagnose/ScreeningCauseScreen";
import PreparationScreen from "../../../screens/PatientScreens/Diagnose/PreparationScreen";
import QuestionnaireScreen from "../../../screens/PatientScreens/Diagnose/QuestionnaireScreen";
import ConsultDoctorScreen from "../../../screens/PatientScreens/Diagnose/ConsultDoctorScreen";
import ThankYouScreen from "../../../screens/PatientScreens/Diagnose/ThankYouScreen";
import SetDoctorScreen from "../../../screens/PatientScreens/SetDoctorScreen";
import { useSelector } from "react-redux";

const Diagnose = createStackNavigator();
const Preliminary = createStackNavigator();

const DiagnoseNavigator = () => {
  const { doctor } = useSelector((state) => state.auth);

  if (doctor) {
    return (
      <Diagnose.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Diagnose.Screen
          name="Screening Cause"
          component={ScreeningCauseScreen}
        />
        <Diagnose.Screen name="Set Doctor" component={SetDoctorScreen} />
        <Diagnose.Screen name="Prepare" component={PreparationScreen} />
        <Diagnose.Screen name="Questionnaire" component={QuestionnaireScreen} />
        <Diagnose.Screen name="Consult" component={ConsultDoctorScreen} />
        <Diagnose.Screen name="Thank You" component={ThankYouScreen} />
      </Diagnose.Navigator>
    );
  } else {
    return (
      <Preliminary.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Preliminary.Screen name="SetDoctor" component={SetDoctorScreen} />
      </Preliminary.Navigator>
    );
  }
};

export default DiagnoseNavigator;
