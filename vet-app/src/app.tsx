import React from "react";
import "./App.css";
import AppRouteProvider from "routes/app-route-provider";
import { Provider } from "react-redux";
import store, { persistor } from "redux/store";
import withLoading from "components/shared/with-loading/with-loading.component";
import { PersistGate } from "redux-persist/integration/react";
import { AppModalProvider } from "context/app-modal.context";
import { MessageProvider } from "context/session.context";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppModalProvider>
          <MessageProvider>
            <AppRouteProvider />
          </MessageProvider>
        </AppModalProvider>
      </PersistGate>
    </Provider>
  );
}

export default withLoading(App);
