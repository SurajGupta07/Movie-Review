import { StyleSheet } from "react-native";
import { GLOBAL_COLORS } from ".";

export const GLOBAL_STYLES = StyleSheet.create({
    errorText: {
        color: GLOBAL_COLORS.textError,
        fontSize: 14,
    },
    moviesListTitle: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
    },
});
