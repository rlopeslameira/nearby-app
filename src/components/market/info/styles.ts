import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    text: {
        fontSize: 14,
        fontFamily: fontFamily.regular,
        color: colors.gray[600],
        lineHeight: 22.4,
        flex: 1,
    },

})