import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MovieDetail, Feed, NoNetwork } from "../screens";
import { SCREEN_TABS } from "./constants";

const Stack = createNativeStackNavigator();

export const FeedStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={SCREEN_TABS.Feed}
            component={Feed}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name={SCREEN_TABS.MovieDetail}
            component={MovieDetail}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name={SCREEN_TABS.NoNetwork}
            component={NoNetwork}
            options={{
                headerShown: false,
            }}
        />
    </Stack.Navigator>
);
