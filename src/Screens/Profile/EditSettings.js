import React, { useState } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import { Center, Input, FormControl, Box, VStack, Image } from "native-base";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";

import { useAuth } from "../../context/AuthProvider";
import { ButtonItem } from "../../components";
import { SCREEN_TABS } from "../../navigators/constants";
import { strings } from "../../utils/TextLocalization";

export const EditSettings = ({ navigation }) => {
    const {
        user,
        updateUserProfile,
        imageURL,
        setImageURL,
        firstName,
        setFirstName,
        fetchUserData,
        userProfileData,
    } = useAuth();
    const [firebaseURL, setFirebaseURL] = useState("");
    const [valid, setValid] = useState(true);

    const uploadImage = async () => {
        const uploadURI = imageURL;
        let filename = uploadURI.substring(uploadURI.lastIndexOf("/") + 1);
        const extension = filename.split(".").pop();
        const name = filename.split(".").slice(0, -1).join(".");
        filename = name + Date.now() + "." + extension;
        const storageRef = storage().ref(filename);
        const task = storageRef.putFile(uploadURI);
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            setFirebaseURL(url);
            return url;
        } catch (err) {
            return null;
        }
    };

    const addImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then((image) => {
            const imageURI = Platform.OS === "ios" ? image.sourceURL : image.path;
            setImageURL(imageURI);
            uploadImage();
        });
    };

    const updateProfileHanlder = () => {
        updateUserProfile({ image: firebaseURL, userId: user.uid, firstName });
        fetchUserData();
        navigation.navigate(SCREEN_TABS.Profile);
    };

    return (
        <View>
            <Center>
                <Box safeArea p="2" py="15" w="90%" maxW="310">
                    <VStack space={3} mt="5">
                        <TouchableOpacity onPress={addImage}>
                            {imageURL === "" ? (
                                <Center>
                                    <Image
                                        source={{
                                            uri: userProfileData[0].userImage,
                                        }}
                                        alt="Image picker"
                                        size={150}
                                        borderRadius={100}
                                    />
                                </Center>
                            ) : (
                                <Center>
                                    <Image
                                        source={{
                                            uri: imageURL,
                                        }}
                                        alt="Image picker"
                                        size={150}
                                        borderRadius={100}
                                    />
                                </Center>
                            )}
                        </TouchableOpacity>
                        <FormControl>
                            <FormControl.Label>{strings.fName}</FormControl.Label>
                            <Input
                                type="text"
                                placeholder="Enter firstname"
                                onChangeText={(val) => {
                                    setFirstName(val);
                                    setValid(false);
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>{strings.lName}</FormControl.Label>
                            <Input type="text" placeholder="Enter Lastname" />
                        </FormControl>

                        <ButtonItem
                            disabled={valid}
                            title={strings.update}
                            mt="2"
                            callback={updateProfileHanlder}
                        />
                    </VStack>
                </Box>
            </Center>
        </View>
    );
};
