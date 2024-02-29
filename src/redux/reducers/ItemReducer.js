import { ACTION_TYPES } from "./ActionTypes";

const {
    GET_WATCHLATER_LOADING,
    GET_WATCHLATER_SUCCESS,
    GET_WATCHLATER_ERROR,
    ADD_WATCHLATER_LOADING,
    ADD_WATCHLATER_SUCCESS,
    ADD_WATCHLATER_ERROR,
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

const defaultState = {
    loadingData: false,
    errorMessage: null,
    feedList: [],
    watchLater: [],
    searchData: [],
    bollywoodItems: [],
    userComments: [],
};

export const itemReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_WATCHLATER_LOADING:
            return { ...state, loadingData: true };
        case GET_WATCHLATER_SUCCESS:
            return {
                ...state,
                loadingData: false,
                watchLater: [
                    ...action.payload.items.filter(
                        (videos) => videos.userId === action.payload.user.uid,
                    ),
                ],
            };
        case GET_WATCHLATER_ERROR:
            return { ...state, loadingData: false, errorMessage: action.payload };
        case ADD_WATCHLATER_LOADING:
            return { ...state, loadingData: true };
        case ADD_WATCHLATER_SUCCESS:
            return {
                ...state,
                loadingData: false,
                watchLater: [
                    ...state.watchLater,
                    {
                        movieId: action.payload.itemId,
                        userId: action.payload.userId,
                        thumbnail: action.payload.thumbnail,
                        trailer: action.payload.trailer,
                        image: action.payload.image,
                        about: action.payload.about,
                        name: action.payload.name,
                    },
                ],
            };
        case ADD_WATCHLATER_ERROR:
            return { ...state, loadingData: false, errorMessage: action.payload };

        case DELETE_WATCHLATER_LOADING:
            return { ...state, loadingData: true };
        case DELETE_WATCHLATER_SUCCESS:
            return {
                ...state,
                loadingData: false,
                watchLater: [],
            };
        case DELETE_WATCHLATER_ERROR:
            return { ...state, loadingData: false, errorMessage: action.payload };

        case SEARCH_LOADING:
            return { ...state, loadingData: true };
        case SEARCH_SUCCESS:
            return {
                ...state,
                loadingData: false,
                searchData: action.payload,
            };
        case SEARCH_ERROR:
            return { ...state, loadingData: false, errorMessage: action.payload };

        case GET_MOVIES_LOADING:
            return { ...state, loadingData: true };
        case GET_MOVIES_SUCCESS:
            return {
                ...state,
                loadingData: false,
                feedList: action.payload,
            };
        case GET_MOVIES_ERROR:
            return { ...state, loadingData: false, errorMessage: action.payload };

        case GET_BOLLYWOOD_LOADING:
            return { ...state, loadingData: true };
        case GET_BOLLYWOOD_SUCCESS:
            return {
                ...state,
                loadingData: false,
                bollywoodItems: action.payload,
            };
        case GET_BOLLYWOOD_ERROR:
            return { ...state, loadingData: false, errorMessage: action.payload };
        case GET_COMMENTS_LOADING:
            return { ...state, loadingData: true };
        case GET_COMMENTS_SUCCESS:
            return {
                ...state,
                loadingData: false,
                userComments: [
                    ...action.payload.items.filter(
                        (videos) => videos.itemId === action.payload.itemId,
                    ),
                ],
            };
        case GET_COMMENTS_ERROR:
            return { ...state, loadingData: false, errorMessage: action.payload };
        case ADD_COMMENTS_LOADING:
            return { ...state, loadingData: true };
        case ADD_COMMENTS_SUCCESS:
            return {
                ...state,
                loadingData: false,
                userComments: [
                    ...state.userComments,
                    {
                        comment: action.payload.comment,
                    },
                ],
            };
        case ADD_COMMENTS_ERROR:
            return { ...state, loadingData: false, errorMessage: action.payload };
        default:
            return state;
    }
};
