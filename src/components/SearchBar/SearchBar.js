import React from "react";
import { Input, Icon } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

import { GLOBAL_COLORS } from "../../constants";

export const SearchBar = ({ search, setSearch }) => {
    return (
        <Input
            InputLeftElement={
                <Icon
                    ml="2"
                    size="5"
                    color={GLOBAL_COLORS.text700}
                    as={<Ionicons name="ios-search" />}
                />
            }
            size="xl"
            placeholder="Search by title.."
            value={search}
            onChangeText={(text) => setSearch(text)}
        />
    );
};
