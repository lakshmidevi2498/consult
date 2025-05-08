import { colors } from "../utilities/GlobalColors"
import { Imports } from "../utilities/GlobalImports"

const GlobalButton = ({ btnTitle, handleButtonPressed }) => {
    return (
       
            <Imports.TouchableOpacity onPress={handleButtonPressed}>
                 <Imports.View style={styles.button}>
                <Imports.Text style={styles.buttonText}>{btnTitle} </Imports.Text>
                </Imports.View>
            </Imports.TouchableOpacity>
       
    )
}

export default GlobalButton

const styles = Imports.StyleSheet.create({
    button: {
        width: "100%",
        height: 50,
        backgroundColor: colors.primary500,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    }
})