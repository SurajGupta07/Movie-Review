import { StyleSheet } from "react-native";
import { GLOBAL_COLORS, FONT_WEIGHT, FONT_SIZE, FONTS } from "../../constants";

export const styles = StyleSheet.create({
    btnLogoutText: {
        paddingTop: 5,
        marginLeft: 15,
        fontSize: FONT_SIZE.h5,
        letterSpacing: 0.5,
        fontWeight: FONT_WEIGHT.bold,
    },
    reviewTextContainer: {
        marginBottom: 2,
        borderRadius: 5,
        width: 220,
        marginLeft: 10,
        borderColor: GLOBAL_COLORS.primaryColor,
        borderWidth: 1,
    },
    reviewText: {
        color: GLOBAL_COLORS.textSecondary,
        fontSize: FONT_SIZE.body,
        fontWeight: FONT_WEIGHT.regular,
        fontFamily: FONTS.body,
        padding: 10,
        letterSpacing: 1,
    },
    loader: {
        textAlign: "center",
        marginTop: 100,
    },
});
