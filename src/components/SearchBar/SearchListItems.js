import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, View, Text, FlatList, Image, HStack, VStack, Center } from "native-base";

import { GLOBAL_STYLES } from "../../constants";
import { SCREEN_TABS } from "../../navigators/constants";
import { strings } from "../../utils/TextLocalization";

export const SearchListItem = ({ typeFilm, navigation }) => {
    return (
        <View mt={5}>
            <Box ml={5}>
                <Center>
                    {typeFilm?.length > 0 ? (
                        <Text style={GLOBAL_STYLES.moviesListTitle}>
                            {typeFilm?.length} {strings.video}
                        </Text>
                    ) : (
                        <Text style={GLOBAL_STYLES.moviesListTitle}>{strings.noResult}</Text>
                    )}
                </Center>
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
                        <HStack mt={5}>
                            <Image
                                source={{
                                    uri: item.image,
                                }}
                                alt="Alternate Text"
                                width={200}
                                height={120}
                            />
                            <VStack flexDir="column" justifyContent="space-evenly">
                                <Text ml={5} bold fontSize="lg" style={{ width: 160 }}>
                                    {item.name}
                                </Text>
                            </VStack>
                        </HStack>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};
