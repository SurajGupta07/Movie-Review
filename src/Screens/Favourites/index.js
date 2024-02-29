import React, { useEffect } from "react";
import { View, Box } from "native-base";
import { useDispatch, useSelector } from "react-redux";

import { Header, WatchlistCard } from "../../components";
import { useAuth } from "../../context/AuthProvider";
import { getWatchListItems } from "../../redux/actions/ItemAction";
import { strings } from "../../utils/TextLocalization";

export const Favourite = ({ navigation }) => {
    const watchListVidoes = useSelector((state) => state?.watchLater);
    const { user } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWatchListItems({ user }));
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Header title={strings.favTitle} />
            <Box mt={10} mb={5} style={{ flex: 1 }}>
                <WatchlistCard
                    typeFilm={watchListVidoes}
                    title={strings.favTitle}
                    navigation={navigation}
                />
            </Box>
        </View>
    );
};
