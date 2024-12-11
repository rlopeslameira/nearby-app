import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        maxHeight: 36,
        position: 'absolute',
        zIndex: 1,
        top: Platform.OS === 'ios' ? 76 : 16,
    },
    content: {
        gap: 8,
        paddingHorizontal: 16,
    }
})