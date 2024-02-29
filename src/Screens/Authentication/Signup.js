import React from "react";
import { SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import { Center, Input, FormControl, HStack, Box, Text, Link, Heading, VStack } from "native-base";

import { SCREEN_TABS } from "../../navigators/constants";
import { useAuth } from "../../context/AuthProvider";
import { useValidate } from "../../hooks/useValidate";
import { GLOBAL_STYLES } from "../../constants";
import { ButtonItem } from "../../components";
import { strings } from "../../utils/TextLocalization";

export const Signup = ({ navigation }) => {
    const { formData, register } = useAuth();
    const {
        handleEmailChange,
        handlePasswordChange,
        handleRePasswordChange,
        handleValidEmail,
        handleValidPassword,
        handleValidRePassword,
    } = useValidate();

    return (
        <SafeAreaView>
            <Center>
                <Box safeArea p="2" py="20" w="90%" maxW="310">
                    <Heading size="lg" color="coolGray.800" fontWeight="semibold">
                        {strings.signUpWelcomeText}
                    </Heading>
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>{strings.email}</FormControl.Label>
                            <Input
                                placeholder="Enter email"
                                value={formData.email}
                                onChangeText={(val) => handleEmailChange(val)}
                                onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                            />
                            {formData.isValidUser ? null : (
                                <Animatable.View animation="fadeInLeft" duration={800}>
                                    <Text style={GLOBAL_STYLES.errorText}>
                                        {strings.authValidEmail}
                                    </Text>
                                </Animatable.View>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>{strings.password}</FormControl.Label>
                            <Input
                                type="password"
                                placeholder="Enter password"
                                onChangeText={(val) => handlePasswordChange(val)}
                                onEndEditing={(e) => handleValidRePassword(e.nativeEvent.text)}
                            />
                            {formData.isValidPassword ? null : (
                                <Animatable.View animation="fadeInLeft" duration={800}>
                                    <Text style={GLOBAL_STYLES.errorText}>
                                        {strings.authValidPassword}
                                    </Text>
                                </Animatable.View>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Confirm Password</FormControl.Label>
                            <Input
                                type="password"
                                placeholder="Confirm password"
                                onChangeText={(val) => handleRePasswordChange(val)}
                                onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
                            />
                            {formData.isValidRePassword ? null : (
                                <Animatable.View animation="fadeInLeft" duration={800}>
                                    <Text style={GLOBAL_STYLES.errorText}>
                                        {strings.passwordMatch}
                                    </Text>
                                </Animatable.View>
                            )}
                        </FormControl>
                        <ButtonItem
                            mt="2"
                            title={strings.btSignup}
                            callback={() => register(formData.email, formData.password)}
                        />
                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" color="coolGray.800" pr="1">
                                {strings.exsistingUser}
                            </Text>
                            <Link
                                _text={{
                                    color: "indigo.500",
                                    fontWeight: "medium",
                                    fontSize: "sm",
                                }}
                                onPress={() => navigation.navigate(SCREEN_TABS.Signin)}
                            >
                                {strings.signIn}
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </SafeAreaView>
    );
};
