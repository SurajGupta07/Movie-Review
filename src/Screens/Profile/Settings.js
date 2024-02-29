import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, Center, Box, Text, HStack, Image } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

import { useAuth } from "../../context/AuthProvider";
import { Header } from "../../components/Header";
import { SCREEN_TABS } from "../../navigators/constants";
import { GLOBAL_COLORS } from "../../constants";
import { styles } from "./ProfileStyles";
import { strings } from "../../utils/TextLocalization";

export const Settings = ({ navigation }) => {
    const { logout, user, fetchUserData, userProfileData, authType } = useAuth();
    let name = user.email.substring(0, user.email.lastIndexOf("@"));

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <View>
            <Header title={strings.myProfile} />
            <Box p="5">
                <Center flexDir="row" justifyContent="space-between">
                    <Box>
                        {userProfileData !== null ? (
                            <Text fontSize="md" bold color="black">
                                {userProfileData[0].firstName.toUpperCase()}
                            </Text>
                        ) : (
                            <Text fontSize="md" bold color="black">
                                {name.toUpperCase()}
                            </Text>
                        )}
                        {userProfileData !== null ? (
                            <Text fontSize="md" color="black">
                                {userProfileData[0].email.toLowerCase()}
                            </Text>
                        ) : (
                            <Text fontSize="md" color="black">
                                {user.email.toLowerCase()}
                            </Text>
                        )}
                    </Box>

                    {userProfileData !== null && (
                        <Image
                            source={{
                                uri: userProfileData[0].userImage,
                            }}
                            alt="Update Profile Image"
                            size={50}
                            borderRadius={100}
                        />
                    )}
                </Center>
            </Box>
            <Box mt={1} ml={2}>
                <HStack>
                    {authType === "Email" && (
                        <Button m={4} onPress={() => navigation.navigate(SCREEN_TABS.ProfileEdit)}>
                            {strings.resetPassword}
                        </Button>
                    )}
                    <Button m={4} onPress={() => navigation.navigate(SCREEN_TABS.EditSettings)}>
                        {strings.editProfile}
                    </Button>
                </HStack>
            </Box>
            <TouchableOpacity onPress={() => logout()}>
                <Box ml={7} flexDir="row" justifyContent="flex-start">
                    <Icon name="sign-out" size={30} color={GLOBAL_COLORS.primaryColor} />
                    <Text bold fontSize="md" style={styles.btnLogoutText}>
                        {strings.logout}
                    </Text>
                </Box>
            </TouchableOpacity>
        </View>
    );
};
