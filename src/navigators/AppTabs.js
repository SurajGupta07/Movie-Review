import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import { Favourite, SearchScreen } from "../screens";
import { SCREEN_TABS } from "./constants";
import { GLOBAL_COLORS } from "../constants";
import { ProfileStack } from "./ProfileStack";
import { FeedStack } from "./FeedStack";

const AppTab = createBottomTabNavigator();

export const AppTabs = () => {
    const tabsArray = [
        { component: FeedStack, name: SCREEN_TABS.HomeFeed, iconName: "home" },
        { component: SearchScreen, name: SCREEN_TABS.Search, iconName: "search" },
        { component: Favourite, name: SCREEN_TABS.Favourite, iconName: "bookmark" },
        { component: ProfileStack, name: SCREEN_TABS.ProfileScreen, iconName: "user" },
    ];

    return (
        <AppTab.Navigator screenOptions={{ headerShown: false }}>
            {tabsArray.map((item) => (
                <AppTab.Screen
                    name={item.name}
                    component={item.component}
                    options={{
                        tabBarIcon: () => (
                            <Icon name={item.iconName} color={GLOBAL_COLORS.iconColor} size={30} />
                        ),
                    }}
                    key={Math.random()}
                />
            ))}
        </AppTab.Navigator>
    );
};
