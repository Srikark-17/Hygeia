import React from "react";
import { Provider } from "react-redux";
import Helper from "./Helper";
import { persister, store } from "./redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <Helper />
      </PersistGate>
    </Provider>
  );
}
