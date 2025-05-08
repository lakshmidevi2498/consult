import { StyleSheet, Text, TextInput, View } from "react-native"
import { Imports } from "../utilities/GlobalImports";
import { colors } from "../utilities/GlobalColors";

const GlobalInputField = ({fieldKey , placeholder , value ,handleChangeText ,secure , error ,captial ,labell , labelColor}) => {


    return (
        <>
        <Imports.View >
            <Imports.Text style={[styles.label,{color:labelColor}]}>{labell}</Imports.Text>
        <Imports.View style={styles.input}>
            <Imports.TextInput placeholder= {placeholder} onChangeText={(text)=>{ handleChangeText(fieldKey,text) }} value={value} secureTextEntry={secure} autoCapitalize={captial} />
        </Imports.View>
        {error &&<Imports.Text style={{color:"red",fontSize:16}}>{error}</Imports.Text> }
        </Imports.View>
        </>
      )
}

export default GlobalInputField;

const styles = StyleSheet.create({
    input:{
        // height: 50,
        borderRadius:8,
        borderColor:colors.primary500,
        borderWidth:1,
        // justifyContent:"center",
    padding:3,
    backgroundColor:"white",
    },
    label:{
        fontSize: 17,
        fontWeight: 400,
        marginBottom: 8,
    }
})