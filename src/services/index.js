import firestore from "@react-native-firebase/firestore";

export const getWatchListItemsService = async () => {
    let list = [];
    const snapshot = await firestore().collection("watchlater").get();
    snapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        list.push(data);
    });
    return list;
};

export const addToWatchListService = async ({
    itemId,
    userId,
    thumbnail,
    trailer,
    image,
    about,
    name,
}) => {
    await firestore().collection("watchlater").add({
        movieId: itemId,
        userId: userId,
        thumbnail,
        trailer,
        image,
        about,
        name,
    });
};

export const removeFromWatchListService = async ({ userId }) => {
    const snapshot = await firestore().collection("watchlater").where("userId", "==", userId).get();
    snapshot.forEach((doc) => {
        firestore().collection("watchlater").doc(doc.id).delete();
    });
};

export const searchDataService = async (search) => {
    let list = [];
    const snapshot = await firestore()
        .collection("latest")
        .where("name", ">=", search)
        .where("name", "<=", search + "z")
        .get();

    snapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        list.push(data);
    });
    return list;
};

export const getBollywoodItemsService = async () => {
    const list = [];
    const snapshot = await firestore().collection("bollywood").orderBy("name", "asc").get();
    snapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        list.push(data);
    });
    return list;
};

export const fetchFeedMoviesService = async () => {
    const list = [];
    const snapshot = await firestore().collection("latest").orderBy("name", "desc").get();
    snapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        list.push(data);
    });

    return list;
};

export const addReviewsService = async ({
    userId,
    itemId,
    thumbnail,
    trailer,
    image,
    about,
    name,
    comment,
}) => {
    await firestore()
        .collection("comments")
        .add({ userId, itemId, thumbnail, trailer, image, about, name, comment });
};

export const getReviewsService = async () => {
    const list = [];
    const snapshot = await firestore().collection("comments").get();
    snapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        list.push(data);
    });
    return list;
};
