import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

import { useAuth } from "../context/AuthProvider";
import { AuthStacks } from "./AuthStacks";
import { AppTabs } from "./AppTabs";

export const Routes = () => {
    const { user, setUser } = useAuth();
    const [initializing, setInitializing] = useState(true);

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    return <NavigationContainer>{user ? <AppTabs /> : <AuthStacks />}</NavigationContainer>;
};
