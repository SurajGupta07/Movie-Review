import React from "react";
import { Text, View } from "native-base";

import { styles } from "./NoNetworkStyle";

export const NoNetwork = () => {
    return (
        <View style={styles.reloadContainer}>
            <View>
                <Text fontWeight="bold" fontSize="xl" mb={5}>
                    No Internet, Try again later!
                </Text>
            </View>
        </View>
    );
};
