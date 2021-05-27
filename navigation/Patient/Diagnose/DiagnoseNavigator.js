import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ScreeningCauseScreen from "../../../screens/PatientScreens/Diagnose/ScreeningCauseScreen";
import PreparationScreen from "../../../screens/PatientScreens/Diagnose/PreparationScreen";
import QuestionnaireScreen from "../../../screens/PatientScreens/Diagnose/Questionnaire";
import UploadImageScreen from "../../../screens/PatientScreens/Diagnose/UploadImageScreen";
import ThankYouScreen from "../../../screens/PatientScreens/Diagnose/ThankYouScreen";

const Diagnose = createStackNavigator();

const DiagnoseNavigator = () => {
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
      <Diagnose.Screen name="Prepare" component={PreparationScreen} />
      <Diagnose.Screen name="Questionnaire" component={QuestionnaireScreen} />
      <Diagnose.Screen name="Upload Image" component={UploadImageScreen} />
      <Diagnose.Screen name="Thank You" component={ThankYouScreen} />
    </Diagnose.Navigator>
  );
};

export default DiagnoseNavigator;
