import { extendTheme } from "native-base";

export const theme = extendTheme({
    components: {
        Button: {
            baseStyle: {
                rounded: "lg",
            },
            defaultProps: {
                size: "lg",
                colorScheme: "blue",
            },
            sizes: {
                xl: { fontSize: "64px" },
                lg: { fontSize: "32px" },
                md: { fontSize: "16px" },
                sm: { fontSize: "12px" },
            },
        },
    },
});
