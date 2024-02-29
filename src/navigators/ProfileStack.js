import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Settings, EditPassword, EditSettings } from "../screens";
import { SCREEN_TABS } from "./constants";
import { GLOBAL_COLORS } from "../constants";
import { strings } from "../utils/TextLocalization";

const Stack = createNativeStackNavigator();

export const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={SCREEN_TABS.Profile}
            component={Settings}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name={SCREEN_TABS.ProfileEdit}
            component={EditPassword}
            options={{
                title: strings.editPassword,
                headerStyle: {
                    backgroundColor: GLOBAL_COLORS.primaryColor,
                },
                headerTintColor: GLOBAL_COLORS.textPrimary,
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 20,
                },
            }}
        />
        <Stack.Screen
            name={SCREEN_TABS.EditSettings}
            component={EditSettings}
            options={{
                title: strings.editProfile,
                headerStyle: {
                    backgroundColor: GLOBAL_COLORS.primaryColor,
                },
                headerTintColor: GLOBAL_COLORS.textPrimary,
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 20,
                },
            }}
        />
    </Stack.Navigator>
);
