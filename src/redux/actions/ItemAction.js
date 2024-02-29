import firestore from "@react-native-firebase/firestore";
import { ACTION_TYPES } from "../reducers/ActionTypes";

import {
    getWatchListItemsService,
    addToWatchListService,
    removeFromWatchListService,
    searchDataService,
    getBollywoodItemsService,
    fetchFeedMoviesService,
    addReviewsService,
    getReviewsService,
} from "../../services";

const {
    GET_WATCHLATER_LOADING,
    GET_WATCHLATER_SUCCESS,
    GET_WATCHLATER_ERROR,
    ADD_WATCHLATER_LOADING,
    ADD_WATCHLATER_ERROR,
    ADD_WATCHLATER_SUCCESS,
    DELETE_WATCHLATER_LOADING,
    DELETE_WATCHLATER_SUCCESS,
    DELETE_WATCHLATER_ERROR,
    SEARCH_LOADING,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    GET_BOLLYWOOD_LOADING,
    GET_BOLLYWOOD_SUCCESS,
    GET_BOLLYWOOD_ERROR,
    GET_MOVIES_LOADING,
    GET_MOVIES_SUCCESS,
    GET_MOVIES_ERROR,
    ADD_COMMENTS_LOADING,
    ADD_COMMENTS_ERROR,
    ADD_COMMENTS_SUCCESS,
    GET_COMMENTS_LOADING,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_ERROR,
} = ACTION_TYPES;

export const getWatchListItems = ({ user }) => {
    return async (dispatch) => {
        dispatch({
            type: GET_WATCHLATER_LOADING,
        });
        try {
            let items = await getWatchListItemsService();
            dispatch({
                type: GET_WATCHLATER_SUCCESS,
                payload: { items, user },
            });
        } catch (err) {
            dispatch({
                type: GET_WATCHLATER_ERROR,
                payload: "Error Occured",
            });
        }
    };
};

export const addToWatchList = ({ itemId, userId, thumbnail, trailer, image, about, name }) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_WATCHLATER_LOADING,
        });
        try {
            await addToWatchListService({ itemId, userId, thumbnail, trailer, image, about, name });
            dispatch({
                type: ADD_WATCHLATER_SUCCESS,
                payload: { itemId, userId, thumbnail, trailer, image, about, name },
            });
        } catch (err) {
            dispatch({
                type: ADD_WATCHLATER_ERROR,
                payload: "Unable to add to favourites",
            });
            return err;
        }
    };
};

export const removeFromWatchList = ({ userId }) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_WATCHLATER_LOADING,
        });
        try {
            await removeFromWatchListService({ userId });
            dispatch({
                type: DELETE_WATCHLATER_SUCCESS,
            });
        } catch (err) {
            dispatch({
                type: DELETE_WATCHLATER_ERROR,
                payload: "Could not delete the item!",
            });
            return err;
        }
    };
};

export const searchData = ({ search }) => {
    return async (dispatch) => {
        dispatch({
            type: SEARCH_LOADING,
        });
        try {
            let items = await searchDataService(search);
            dispatch({
                type: SEARCH_SUCCESS,
                payload: items,
            });
        } catch (err) {
            dispatch({
                type: SEARCH_ERROR,
                payload: "Could not fetch the data!",
            });
            return err;
        }
    };
};

export const getBollywoodItems = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_BOLLYWOOD_LOADING,
        });
        try {
            const items = await getBollywoodItemsService();
            dispatch({
                type: GET_BOLLYWOOD_SUCCESS,
                payload: items,
            });
        } catch (err) {
            dispatch({
                type: GET_BOLLYWOOD_ERROR,
                payload: "Error Occured",
            });
            return err;
        }
    };
};

export const fetchFeedMovies = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_MOVIES_LOADING,
        });
        try {
            const items = await fetchFeedMoviesService();
            dispatch({
                type: GET_MOVIES_SUCCESS,
                payload: items,
            });
        } catch (err) {
            dispatch({
                type: GET_MOVIES_ERROR,
                payload: "Error Occured",
            });
            return err;
        }
    };
};

export const addReviews = ({ userId, itemId, thumbnail, trailer, image, about, name, comment }) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_COMMENTS_LOADING,
        });
        try {
            dispatch({
                type: ADD_COMMENTS_SUCCESS,
                payload: { userId, itemId, thumbnail, trailer, image, about, name, comment },
            });
            await addReviewsService({
                userId,
                itemId,
                thumbnail,
                trailer,
                image,
                about,
                name,
                comment,
            });
        } catch (err) {
            dispatch({
                type: ADD_COMMENTS_ERROR,
                payload: "Couldn't add review",
            });
            return err;
        }
    };
};

export const getReviews = ({ itemId }) => {
    return async (dispatch) => {
        dispatch({
            type: GET_COMMENTS_LOADING,
        });
        try {
            const items = await getReviewsService();
            dispatch({
                type: GET_COMMENTS_SUCCESS,
                payload: { items, itemId },
            });
        } catch (err) {
            dispatch({
                type: GET_COMMENTS_ERROR,
                payload: "Couldn't fetch review",
            });
            return err;
        }
    };
};
