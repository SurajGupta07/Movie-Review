import React, { useState, useEffect } from "react";
import { View, Center, Stack } from "native-base";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "../../components";
import { SearchBar } from "../../components";
import { searchData } from "../../redux/actions/ItemAction";
import { SearchListItem } from "../../components";
import { strings } from "../../utils/TextLocalization";

export const SearchScreen = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const searchListVideos = useSelector((state) => state.searchData);

    useEffect(() => {
        let timer;
        if (search !== "") {
            timer = setTimeout(() => {
                dispatch(searchData({ search }));
            }, 300);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    return (
        <View>
            <Header title={strings.search} />
            <Center>
                <Stack
                    w={{
                        base: "75%",
                        md: "25%",
                    }}
                    mt={5}
                >
                    <SearchBar search={search} setSearch={setSearch} />
                </Stack>
            </Center>
            {searchListVideos && (
                <SearchListItem typeFilm={searchListVideos} navigation={navigation} />
            )}
        </View>
    );
};
