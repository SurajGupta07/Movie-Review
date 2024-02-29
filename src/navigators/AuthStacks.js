import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Signin, Signup, OnboardingScreen, Localization } from "../screens";
import { SCREEN_TABS } from "./constants";

const AuthenticationStack = createNativeStackNavigator();

export const AuthStacks = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;

    useEffect(() => {
        AsyncStorage.getItem("alreadyLaunched").then((value) => {
            if (value == null) {
                AsyncStorage.setItem("alreadyLaunched", "true");
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });
    }, []);

    if (isFirstLaunch === null) {
        return null;
    } else if (isFirstLaunch === true) {
        routeName = SCREEN_TABS.Onboarding;
    } else {
        routeName = SCREEN_TABS.Localization;
    }

    return (
        <AuthenticationStack.Navigator initialRouteName={routeName}>
            <AuthenticationStack.Screen
                name={SCREEN_TABS.Onboarding}
                component={OnboardingScreen}
                options={{ headerShown: false }}
            />
            <AuthenticationStack.Screen
                name={SCREEN_TABS.Localization}
                component={Localization}
                options={{ headerShown: false }}
            />
            <AuthenticationStack.Screen
                name={SCREEN_TABS.Signin}
                component={Signin}
                options={{ headerShown: false }}
            />
            <AuthenticationStack.Screen
                name={SCREEN_TABS.Signup}
                component={Signup}
                options={{ headerShown: false }}
            />
        </AuthenticationStack.Navigator>
    );
};
