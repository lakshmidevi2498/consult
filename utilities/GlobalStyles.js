import { StyleSheet } from "react-native"
import { colors } from "./GlobalColors";

const GlobalStyles = StyleSheet.create({
    mainContainer: {
        flex: 1, 
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    scrollContainer: {
        paddingBottom: 10,
    },
    boldText: {
        fontSize: 17,
        fontWeight: "bold",
        lineHeight: 30,
    },
    title: {
        marginBottom: 10,
        fontSize: 25,
        fontWeight: "bold",
        color: "#1A3A4A",
        marginTop: 20
    },
    buttonWidth: {
        width: "100%",
        marginVertical: 10
    },
});
export default GlobalStyles