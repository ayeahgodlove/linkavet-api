import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import AppRouteProvider from "routes/app-route-provider";
import withLoading from "components/shared/with-loading/with-loading.component";
import { AppModalProvider } from "context/app-modal.context";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <AppModalProvider>
        <AppRouteProvider />
      </AppModalProvider>
      </PersistGate>
    </Provider>
  );
}

export default withLoading(App);
