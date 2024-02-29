import React from "react";
import { SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";
import { strings } from "../../utils/TextLocalization";
import firestore from "@react-native-firebase/firestore";

import {
    Button,
    Center,
    Input,
    FormControl,
    HStack,
    Box,
    Text,
    Link,
    Heading,
    VStack,
} from "native-base";

import { SCREEN_TABS } from "../../navigators/constants";
import { useAuth } from "../../context/AuthProvider";
import { useValidate } from "../../hooks/useValidate";
import { GLOBAL_STYLES } from "../../constants";
import { ButtonItem } from "../../components";

export const Signin = ({ navigation }) => {
    GoogleSignin.configure({
        webClientId: "399376882142-f4v1ija2qjoavvl1jlf2dvaajbut2gud.apps.googleusercontent.com",
    });

    const { formData, login, valid } = useAuth();
    const { handleEmailChange, handlePasswordChange, handleValidEmail, handleValidPassword } =
        useValidate();

    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const userCredentials = await auth().signInWithCredential(googleCredential);

        const isNewUser = userCredentials.additionalUserInfo.isNewUser;
        const firstName = userCredentials.additionalUserInfo.profile.given_name;
        const email = userCredentials.additionalUserInfo.profile.email;
        const displayPic = userCredentials.additionalUserInfo.profile.picture;
        const userId = userCredentials.user._auth._user._user.uid;

        if (isNewUser) {
            const newTask = await firestore().collection("users").doc(userId).set({
                firstName: firstName,
                lastName: "",
                email: email,
                createdAt: firestore.FieldValue.serverTimestamp(),
                userId: userId,
                userImage: displayPic,
            });
        }
    }

    return (
        <SafeAreaView>
            <Center>
                <Box safeArea p="2" py="20" w="90%" maxW="310">
                    <Heading size="lg" fontWeight="600" color="coolGray.800">
                        {strings.signInWelcomeText}
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
                            mt="2"
                            title={strings.signIn}
                            callback={() => login(formData.email, formData.password)}
                        />
                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" color="coolGray.800" pr="1">
                                {strings.newUserText}
                            </Text>
                            <Link
                                _text={{
                                    color: "indigo.500",
                                    fontWeight: "medium",
                                    fontSize: "sm",
                                }}
                                onPress={() => navigation.navigate(SCREEN_TABS.Signup)}
                            >
                                {strings.signUp}
                            </Link>
                        </HStack>
                    </VStack>
                    <Button
                        mt={5}
                        onPress={() =>
                            onGoogleButtonPress().then(() =>
                                navigation.navigate(SCREEN_TABS.FeedStack),
                            )
                        }
                        leftIcon={
                            <Icon
                                name="google"
                                size={25}
                                color="white"
                                style={{ display: "flex" }}
                            />
                        }
                    >
                        {strings.SignGoogle}
                    </Button>
                </Box>
            </Center>
        </SafeAreaView>
    );
};
