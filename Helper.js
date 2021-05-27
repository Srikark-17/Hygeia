import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import AuthNavigator from "./navigation/AuthNavigator";
import ChoiceNavigator from "./navigation/ChoiceNavigator";
import LoadingScreen from "./screens/LoadingScreen";
import { useFonts } from "@use-expo/font";
import PatientNavigator from "./navigation/Patient/PatientNavigator";

import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persister, store } from "./redux/store";

const customFonts = {
  JosefinSans_Regular: require("./assets/fonts/Josefin_Sans/static/JosefinSans-Regular.ttf"),
  JosefinSans_SemiBold: require("./assets/fonts/Josefin_Sans/static/JosefinSans-SemiBold.ttf"),
  Poppins_Regular: require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
  Roboto_Regular: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  Roboto_Medium: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  Roboto_Bold: require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
};

const Helper = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [isLoaded] = useFonts(customFonts);
  const { userRole } = useSelector((state) => state.auth);
  const { basicInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Logged in
        setUser(authUser);
      } else {
        // Logged out
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (initializing || !isLoaded) return <LoadingScreen />;
  if (!user) {
    return (
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <AuthNavigator />
        </PersistGate>
      </Provider>
    );
  } else if (user && (userRole == "No Role" || basicInfo == false)) {
    return (
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <ChoiceNavigator />
        </PersistGate>
      </Provider>
    );
  } else if (user && userRole == "Patient" && basicInfo == true) {
    return (
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <PatientNavigator />
        </PersistGate>
      </Provider>
    );
  }
};

export default Helper;
