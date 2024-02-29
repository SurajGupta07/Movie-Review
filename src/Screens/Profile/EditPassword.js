import React, { useState } from "react";
import { View } from "react-native";
import { Center, Input, FormControl, Box, Heading, VStack, Text } from "native-base";
import * as Animatable from "react-native-animatable";

import { useValidate } from "../../hooks/useValidate";
import { useAuth } from "../../context/AuthProvider";
import { SCREEN_TABS } from "../../navigators/constants";
import { CustomModal, ButtonItem } from "../../components";
import { GLOBAL_STYLES, GLOBAL_COLORS } from "../../constants";
import { strings } from "../../utils/TextLocalization";

export const EditPassword = ({ navigation }) => {
    const { formData, updateUser, passwordError, valid } = useAuth();
    const { handlePasswordChange, handleValidPassword } = useValidate();
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const updateHandler = () => {
        updateUser({ currentPassword: password, newPassword: formData.password });
        setShowModal(true);
    };
    const callback = () => {
        navigation.navigate(SCREEN_TABS.Profile);
    };

    return (
        <View>
            <Center>
                <Box safeArea p="2" py="20" w="90%" maxW="310">
                    <Heading size="lg" fontWeight="600" color="coolGray.800">
                        {strings.update} {strings.password}
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>{strings.currentPassword}</FormControl.Label>
                            <Input
                                type="password"
                                placeholder="Current Password"
                                onChangeText={(val) => setPassword(val)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>{strings.newPassword}</FormControl.Label>
                            <Input
                                type="password"
                                placeholder="New Password"
                                onChangeText={(val) => handlePasswordChange(val)}
                                onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
                            />
                            {formData.isValidPassword ? null : (
                                <Animatable.View animation="fadeInLeft" duration={800}>
                                    <Text style={GLOBAL_STYLES.errorText}>
                                        {strings.authValidPassword}
                                    </Text>
                                </Animatable.View>
                            )}
                        </FormControl>

                        <ButtonItem
                            disabled={valid}
                            title={strings.update}
                            mt="2"
                            callback={updateHandler}
                        />
                    </VStack>
                </Box>
                {passwordError ? (
                    <CustomModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        message={passwordError.split("]").pop()}
                        header="Update Error"
                        callback={callback}
                        fontColor={GLOBAL_COLORS.textError}
                    />
                ) : (
                    <CustomModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        message="Password update Success"
                        header="Update Successful"
                        callback={callback}
                        fontColor={GLOBAL_COLORS.primaryColor}
                    />
                )}
            </Center>
        </View>
    );
};
