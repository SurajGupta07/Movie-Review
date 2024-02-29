import React, { useState, useEffect } from "react";
import {
    Box,
    View,
    Text,
    Image,
    Button,
    VStack,
    useToast,
    HStack,
    FlatList,
    Input,
    Center,
} from "native-base";
import VideoPlayer from "react-native-video-player";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import Share from "react-native-share";

import { Header } from "../../components";
import { styles } from "./FeedStyles";
import { useAuth } from "../../context/AuthProvider";
import { addToWatchList, addReviews, getReviews } from "../../redux/actions/ItemAction";
import { ButtonItem } from "../../components";
import { connectionCheck } from "../../utils/ConnectionCheck";
import { SCREEN_TABS } from "../../navigators/constants";
import { strings } from "../../utils/TextLocalization";

export const MovieDetail = ({ route, navigation }) => {
    const { name, thumbnail, trailer, image, about, itemId } = route.params;
    const [review, setReview] = useState("");
    const watchListVideoes = useSelector((state) => state?.watchLater);
    const reviewComments = useSelector((state) => state.userComments);
    const toast = useToast();
    const { user } = useAuth();
    const dispatch = useDispatch();
    let connection = connectionCheck();
    useEffect(() => {
        dispatch(getReviews({ itemId }));
    }, []);

    const watchListHandler = () => {
        toast.show({
            title: "Successfully added to Watchlist",
        });
        if (connection === false) {
            navigation.navigate(SCREEN_TABS.NoNetwork);
        }
        dispatch(
            addToWatchList({ userId: user.uid, itemId, thumbnail, trailer, image, about, name }),
        );
    };

    const customShare = async () => {
        if (connection === false) {
            navigation.navigate(SCREEN_TABS.NoNetwork);
        }
        const shareOptions = {
            message: name,
            url: trailer,
            type: "image",
        };
        try {
            await Share.open(shareOptions);
        } catch (err) {
            return err;
        }
    };

    const addReviewHandler = () => {
        if (connection === false) {
            navigation.navigate(SCREEN_TABS.NoNetwork);
        }
        dispatch(
            addReviews({
                userId: user.uid,
                itemId,
                thumbnail,
                trailer,
                image,
                about,
                name,
                comment: review,
            }),
        );
        setReview("");
    };

    return (
        <View style={{ flex: 1 }}>
            <Header title={name} navigation={navigation} />
            <Box>
                <VideoPlayer
                    video={{
                        uri: trailer,
                    }}
                    thumbnail={{
                        uri: thumbnail,
                    }}
                    style={{ width: 400, height: 225 }}
                    autoplay={false}
                    defaultMuted={false}
                    showDuration={true}
                />
            </Box>
            <Box ml={1} mt={5} flexDir="row" justifyContent="flex-start">
                <Image
                    marginLeft={2}
                    source={{
                        uri: image,
                    }}
                    alt="Alternate Text"
                    width={150}
                    height={100}
                    rounded="xl"
                />
                <VStack>
                    <Text maxW="200" color="#000" style={styles.btnLogoutText}>
                        {name}
                    </Text>
                </VStack>
            </Box>
            <Box ml={2} mt={5} mr={2}>
                <Text maxW="400">{about}</Text>
            </Box>
            <Box ml={2} mt={5} mr={2} flexDir="row" justifyContent="space-around">
                {watchListVideoes?.find((movie) => movie.movieId == itemId) ? (
                    <Button isDisabled>{strings.watchlist}</Button>
                ) : (
                    <ButtonItem
                        leftIcon={<Icon color="#FFF" name="plus" size={20} />}
                        callback={() => watchListHandler()}
                        title={strings.watchlist}
                    />
                )}

                <ButtonItem
                    leftIcon={<Icon color="#FFF" name="share" size={20} />}
                    callback={customShare}
                    title={strings.share}
                />
            </Box>
            <Box mt={5} ml={10}>
                <HStack>
                    <Input
                        value={review}
                        w="75%"
                        maxWidth="300px"
                        size="md"
                        placeholder="Add Review"
                        onChangeText={(val) => setReview(val)}
                        mr={2}
                    />
                    <Button onPress={addReviewHandler}>{strings.post}</Button>
                </HStack>
            </Box>
            <Box ml={10} mt={2} style={{ flex: 1 }} w="65%" maxWidth="300px">
                <Center>
                    <FlatList
                        data={reviewComments}
                        renderItem={({ item }) => (
                            <View style={styles.reviewTextContainer}>
                                <Text style={styles.reviewText}>{item.comment}</Text>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </Center>
            </Box>
        </View>
    );
};
