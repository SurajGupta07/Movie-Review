import React, { useEffect } from "react";
import RNBootSplash from "react-native-bootsplash";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { LogBox } from "react-native";

import { Routes } from "./navigators/Routes";
import { theme } from "./themes";
import AuthProvider from "./context/AuthProvider";
import store from "./redux/store";

const App = () => {
    useEffect(() => {
        RNBootSplash.hide({ duration: 250 });
    }, []);
    LogBox.ignoreLogs(["Warning: ..."]);
    LogBox.ignoreAllLogs();
    return (
        <Provider store={store}>
            <AuthProvider>
                <NativeBaseProvider theme={theme}>
                    <Routes />
                </NativeBaseProvider>
            </AuthProvider>
        </Provider>
    );
};

export default App;
