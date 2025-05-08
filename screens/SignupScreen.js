import GlobalInputField from "../components/GlobalInputField";
import { useEffect, useState, } from "react";
import { Imports } from "../utilities/GlobalImports";
import GlobalButton from "../components/GlobalButton";
import { firebase } from '../firebase/firebaseConfig'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getIdToken } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import GlobalStyles from "../utilities/GlobalStyles";
import Toast from "react-native-toast-message";

const SignupScreen = () => {
    const navigation = useNavigation()
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [Userdata, setUserdata] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [UserdataError, setUserdataError] = useState({
        nameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false,
    })

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);
    if (initializing) return null;

    const handleChangeText = (fieldKey, text) => {
        setUserdata((prev) => ({ ...prev, [fieldKey]: text }))
        // console.log(Userdata)
    }

    const handleButtonPressed = async () => {
        if (Userdata.name === "" || Userdata.email === "" || Userdata.password === "" || Userdata.confirmPassword === "") {
            alert("Please fill all the fields")
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Userdata.email)) {
            setUserdataError((prev) => ({ ...prev, emailError: true }))
        }
        else if (Userdata.password.length < 6) {
            setUserdataError((prev) => ({ ...prev, passwordError: true, emailError: false }))
        }
        else if (Userdata.password !== Userdata.confirmPassword) {
            setUserdataError((prev) => ({ ...prev, confirmPasswordError: true, passwordError: false, emailError: false }))
        } else {
            try {
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(Userdata.email, Userdata.password);
                console.log("Registered:", userCredential);
                Toast.show({
                    type: 'success',
                    text1: 'success',
                    text2: "Registration is completed successfully",
                    visibilityTime: 4000,
                    autoHide: true,
                    text1Style: {
                        fontSize: 16,
                        fontWeight: 'bold',
                    },
                    text2Style: {
                        fontSize: 14,
                    },
                });
                const user = userCredential.user;
                console.log("user", user)
                const uid = user.uid;
                // console.log("User UID:", uid);  

                await AsyncStorage.setItem('uid', uid);
                await updateProfile(user, {
                    displayName: Userdata.name
                });
                // console.log("user------>", user)
                const accessToken = await getIdToken(user);
                // console.log('Access Token:', accessToken);

                await AsyncStorage.setItem('username', user.displayName);
                await AsyncStorage.setItem('email', user.email);
                await AsyncStorage.setItem('accessToken', accessToken);

                await firebase.firestore().collection('users').doc(user.uid).set({
                    uid: user.uid,
                    name: Userdata.name || "Anonymous",
                    email: user.email,
                    phone: Userdata.phone || null,
                    createdAt: new Date().toISOString(),
                });



                console.log("User data stored in Realtime DB");

                setUserdataError({
                    nameError: false,
                    emailError: false,
                    passwordError: false,
                    confirmPasswordError: false,
                })
                setUserdata({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                })
                alert("Signup Successful")
                navigation.navigate("Home")
            }
            catch (error) {
                console.log("Error: ", error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: "Registration is completed successfully",
                    visibilityTime: 4000,
                    autoHide: true,
                    text1Style: {
                        fontSize: 16,
                        fontWeight: 'bold',
                    },
                    text2Style: {
                        fontSize: 14,
                    },
                });
            }
        }
    }
    return (
        <>
            <Imports.ImageBackground
                source={require('../assets/images/img1.jpg')}
                resizeMode="cover"
                style={styles.backgroundImage}
            >
                <Imports.View style={styles.overlay} />
                <Imports.KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Imports.Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Imports.Platform.OS === 'ios' ? 64 : 20} 
                >
                    <Imports.SafeAreaView style={styles.root}>
                        <Imports.ScrollView contentContainerStyle={[GlobalStyles.scrollContainer, {
                            flexGrow: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }]}>

                            <Imports.View style={styles.formWrapper}>
                                <Imports.View>
                                    <Imports.Text style={styles.signupText}>Sign up to get started</Imports.Text>
                                </Imports.View>
                                <Imports.View style={styles.inputContainer}>
                                    <GlobalInputField fieldKey="name" labell="Name" placeholder="Name" value={Userdata.name} handleChangeText={handleChangeText} labelColor="white" secure={false} error={UserdataError.nameError ? "enter your name" : ""} captial={"word"} />
                                </Imports.View>
                                <Imports.View style={styles.inputContainer}>
                                    <GlobalInputField fieldKey="email" placeholder="Email" labell="Email" value={Userdata.email} handleChangeText={handleChangeText} labelColor="white" secure={false} error={UserdataError.emailError ? "enter a valid email " : ""} captial={"none"} />
                                </Imports.View>
                                <Imports.View style={styles.inputContainer}>
                                    <GlobalInputField fieldKey="password" placeholder="Password" labell="Password" value={Userdata.password} handleChangeText={handleChangeText} labelColor="white" secure={true} error={UserdataError.passwordError ? "password length should be 6" : ""} captial={"none"} />
                                </Imports.View>
                                <Imports.View style={styles.inputContainer}>
                                    <GlobalInputField fieldKey="confirmPassword" placeholder="Confirm Password" labell="Confirm Password" value={Userdata.confirmPassword} handleChangeText={handleChangeText} labelColor="white" secure={true} error={UserdataError.confirmPasswordError ? "confirm password must match password" : ""} captial={"none"} />
                                </Imports.View>
                                <Imports.View style={styles.buttonWidth}>
                                    <GlobalButton btnTitle="Signup" handleButtonPressed={handleButtonPressed} />
                                </Imports.View>
                                <Imports.View  >
                                    <Imports.Text style={styles.loginText} onPress={() => { navigation.navigate("Signin") }}>Already have an account ? Login now</Imports.Text>
                                </Imports.View>
                            </Imports.View>
                        </Imports.ScrollView>
                    </Imports.SafeAreaView>
                </Imports.KeyboardAvoidingView>
            </Imports.ImageBackground>
        </>
    )
}

export default SignupScreen;

const styles = Imports.StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 1,
    },
    root: {
        flex: 1,
        zIndex: 2,
        width: "100%",

    },
    inputContainer: {
        width: "85%",
        marginVertical: 7,
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        opacity: 0.9,
        objectFit: "cover",

    },
    loginText: {
        color: "white",
        fontSize: 16,
        fontWeight: "medium",
        marginTop: 10,
        textAlign: "center",
    },
    buttonWidth: {
        width: "40%",
        marginVertical: 10
    },
    signupText: {
        color: 'white',
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center"
    },
    formWrapper: {
        alignItems: 'center',
        width: '100%',
        justifyContent: "center",

    },
})