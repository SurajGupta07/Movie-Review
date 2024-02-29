import React from "react";
import { View, Button, Text, Center, HStack, Image } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { englishConverter, italianConverter } from "../../utils/TextLocalization";
import { FONT_SIZE, FONT_WEIGHT } from "../../constants";

export const Localization = ({ navigation }) => {
    return (
        <SafeAreaView style={{ backgroundColor: "white", height: "100%", paddingTop: 20 }}>
            <Center>
                <View>
                    <Text fontSize={FONT_SIZE.title} fontWeight={FONT_WEIGHT.medium}>
                        Select a language
                    </Text>
                </View>
                <Image
                    source={require("../../assets/language.png")}
                    size="2xl"
                    alt="Movies Review"
                    mt={10}
                />
                <HStack mt={5}>
                    <View m={2}>
                        <Button onPress={() => englishConverter({ navigation })}>English</Button>
                    </View>
                    <View m={2}>
                        <Button onPress={() => italianConverter({ navigation })}>Italian</Button>
                    </View>
                </HStack>
            </Center>
        </SafeAreaView>
    );
};
