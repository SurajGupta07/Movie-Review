import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, View, Text, FlatList, Image } from "native-base";

import { GLOBAL_STYLES } from "../../constants";
import { SCREEN_TABS } from "../../navigators/constants";

export const MovieCard = ({ typeFilm, title, navigation }) => {
    return (
        <View>
            <Box ml={5}>
                <Text style={GLOBAL_STYLES.moviesListTitle}>{title}</Text>
            </Box>
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
                        <Image
                            marginLeft={5}
                            source={{
                                uri: item.image,
                            }}
                            alt="Alternate Text"
                            width={150}
                            height={100}
                            rounded="xl"
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};
