import { Platform, StyleSheet } from "react-native";
import { GLOBAL_COLORS, FONT_SIZE, FONT_WEIGHT } from "../../constants";

export const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        height: Platform.OS === "ios" ? 85 : 60,
        marginTop: 0,
        backgroundColor: GLOBAL_COLORS.primaryColor,
    },
    heroText: {
        textAlign: "center",
        marginTop: Platform.OS === "ios" ? 0 : 20,
        color: GLOBAL_COLORS.textPrimary,
        fontSize: FONT_SIZE.title,
        fontWeight: FONT_WEIGHT.bold,
    },
    backBtnContainer: {
        marginTop: Platform.OS === "ios" ? 0 : 15,
    },
    backIcon: {
        marginTop: 6,
        marginRight: 5,
        marginStart: 10,
    },
});
