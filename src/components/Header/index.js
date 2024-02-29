import React from "react";
import { HStack, View, Text } from "native-base";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

import { styles } from "./HeaderStyles";
import { SCREEN_TABS } from "../../navigators/constants";

export const Header = ({ title, navigation }) => {
    const route = useRoute();
    return (
        <SafeAreaView style={styles.headerContainer}>
            <View
                style={{
                    flex: 1,
                }}
            >
                {route.name === "MovieDetail" && (
                    <TouchableOpacity onPress={() => navigation.navigate(SCREEN_TABS.Feed)}>
                        <HStack style={styles.backBtnContainer}>
                            <Icon
                                style={styles.backIcon}
                                color="#FFF"
                                name="chevron-left"
                                size={20}
                            />
                            <Text fontSize={20} color="#fff">
                                Back
                            </Text>
                        </HStack>
                    </TouchableOpacity>
                )}
            </View>
            <View
                style={{
                    flex: 3,
                }}
            >
                <Text style={styles.heroText}>{title}</Text>
            </View>
            <View
                style={{
                    flex: 1,
                }}
            ></View>
        </SafeAreaView>
    );
};
