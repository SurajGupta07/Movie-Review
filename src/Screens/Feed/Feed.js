import React, { useEffect } from "react";
import { View, Text, Box, Image } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-native-snap-carousel";
import { Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { useAuth } from "../../context/AuthProvider";
import { MovieCard, Header, Error } from "../../components";
import { getBollywoodItems, fetchFeedMovies } from "../../redux/actions/ItemAction";
import { SCREEN_TABS } from "../../navigators/constants";
import { styles } from "./FeedStyles";
import { strings } from "../../utils/TextLocalization";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

export const Feed = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user } = useAuth();

    useEffect(() => {
        dispatch(getBollywoodItems());
        dispatch(fetchFeedMovies());
    }, [user]);

    const loading = useSelector((state) => state.loadingData);
    const bollywoodMovies = useSelector((state) => state.bollywoodItems);
    const feedMovies = useSelector((state) => state.feedList);
    const error = useSelector((state) => state.errorMessage);
    const name = user.email.substring(0, user.email.lastIndexOf("@")).toUpperCase();
    const feedTitle = `${strings.welcome} ${name}`;

    function _renderItem({ item }) {
        return (
            <View
                style={{
                    height: 200,
                    padding: 40,
                }}
            >
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
                        source={{
                            uri: item.image,
                        }}
                        alt="Movie Image"
                        width={300}
                        height={150}
                    />
                </TouchableOpacity>
                <Text>{item.text}</Text>
            </View>
        );
    }

    return (
        <View>
            <Header title={feedTitle} />
            {error && <Error />}
            {loading === true ? (
                <View>
                    <Icon style={styles.loader} color="#4267B2" name="spinner" size={50} />
                </View>
            ) : (
                <View>
                    <Carousel
                        layout={"default"}
                        data={feedMovies}
                        sliderWidth={viewportWidth}
                        itemWidth={viewportWidth}
                        slideStyle={{ width: viewportWidth }}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                        renderItem={_renderItem}
                    />
                    <Box mt={5}>
                        <MovieCard
                            title={strings.titleMain}
                            typeFilm={feedMovies}
                            navigation={navigation}
                        />
                    </Box>
                    <Box mt={10}>
                        <MovieCard
                            title={strings.bollywood}
                            typeFilm={bollywoodMovies}
                            navigation={navigation}
                        />
                    </Box>
                </View>
            )}
        </View>
    );
};
