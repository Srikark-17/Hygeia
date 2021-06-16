import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PatientView from "../../../screens/DoctorScreens/Patient/PatientView";
import DetailedPatientView from "../../../screens/DoctorScreens/Patient/DetailedPatientView";
import UploadImageScreen from "../../../screens/DoctorScreens/Patient/UploadImageScreen";

const DoctorPatient = createStackNavigator();

const DoctorPatientNavigator = () => {
  return (
    <DoctorPatient.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <DoctorPatient.Screen name="Patient View" component={PatientView} />
      <DoctorPatient.Screen
        name="Detailed Patient View"
        component={DetailedPatientView}
      />
      <DoctorPatient.Screen name="Upload Scan" component={UploadImageScreen} />
    </DoctorPatient.Navigator>
  );
};

export default DoctorPatientNavigator;
