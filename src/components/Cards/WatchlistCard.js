import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, View, Text, FlatList, Image, HStack } from "native-base";
import { useDispatch } from "react-redux";

import { GLOBAL_STYLES } from "../../constants";
import { SCREEN_TABS } from "../../navigators/constants";
import { removeFromWatchList } from "../../redux/actions/ItemAction";
import { ButtonItem } from "../index";
import { useAuth } from "../../context/AuthProvider";
import { strings } from "../../utils/TextLocalization";

export const WatchlistCard = ({ typeFilm, navigation }) => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    return (
        <View>
            {typeFilm?.length > 0 ? (
                <Box flexDir="row" justifyContent="space-between" ml={2} mr={2}>
                    <Text mt={2} style={GLOBAL_STYLES.moviesListTitle}>
                        {typeFilm?.length} {strings.video}
                    </Text>
                    <ButtonItem
                        width="45%"
                        callback={() => dispatch(removeFromWatchList({ userId: user.uid }))}
                        title={strings.deleteItem}
                    />
                </Box>
            ) : (
                <Text ml={2} style={GLOBAL_STYLES.moviesListTitle}>
                    {strings.noItem}
                </Text>
            )}

            <FlatList
                data={typeFilm}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(SCREEN_TABS.MovieDetail, {
                                name: item.name,
                                thumbnail: item.image,
                                trailer: item.trailer,
                                image: item.image,
                                about: item.about,
                                itemId: item.id,
                            })
                        }
                    >
                        <HStack mt={2}>
                            <Image
                                source={{
                                    uri: item.image,
                                }}
                                alt="Alternate Text"
                                width={"100%"}
                                height={150}
                            />
                        </HStack>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};
