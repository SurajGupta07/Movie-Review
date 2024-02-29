import NetInfo from "@react-native-community/netinfo";

export const connectionCheck = () => {
    let connected;
    NetInfo.addEventListener((state) => {
        connected = state.isConnected;
    });

    if (connected === undefined) {
        return true;
    } else {
        return connected;
    }
};
