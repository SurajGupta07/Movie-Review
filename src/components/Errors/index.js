import React from "react";
import { View, Text, Center } from "native-base";

export const Error = () => {
    return (
        <View mt={15}>
            <Center>
                <Text fontSize="lg" fontWeight="bold" fontSize="xl">
                    Something went wrong!
                </Text>
            </Center>
        </View>
    );
};
