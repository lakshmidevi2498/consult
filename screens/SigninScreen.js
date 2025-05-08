import { useState } from "react"
import GlobalInputField from "../components/GlobalInputField"
import { Imports } from "../utilities/GlobalImports"
import GlobalButton from "../components/GlobalButton"
import { firebase } from '../firebase/firebaseConfig'
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getIdToken } from "firebase/auth";
import Toast from "react-native-toast-message"

const SigninScreen = () => {
  const navigation = useNavigation()
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
  const [userDataError, setUserDataError] = useState({
    emailError: false,
    passwordError: false,
  })

  const handleButtonPressed = async () => {
    if (userData.email === "" || userData.password === "") {
      Imports.Alert.alert("Email and password can't be empty");
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email)) {
      // Alert.alert("Email format is invalid");
      setUserDataError((prev) => ({ ...prev, emailError: true }))
    } else if (!userData.password || userData.password.trim().length < 6) {
      // Alert.alert("Password must be at least 6 characters");
      setUserDataError((prev) => ({ ...prev, passwordError: true, emailError: false }))
    }
    else {
      try {


        setUserDataError({
          emailError: false,
          passwordError: false,
        })

        const userCredential = await firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
        console.log("signin:", userCredential.user);
        Toast.show({
          type: 'success',
          text1: 'success',
          text2: "signin is successfully",
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
        // console.log("token:", userCredential.user.stsTokenManager.accessToken);
        const user = userCredential.user;
        const accessToken = await getIdToken(user);
        // console.log('Access Token:', accessToken);
        AsyncStorage.setItem('username', user.displayName)
        AsyncStorage.setItem('email', user.email)
        AsyncStorage.setItem('accessToken', accessToken)

        setUserData({
          email: "",
          password: "",
        })
        navigation.navigate("Home")
      } catch (error) {
        console.log("error", error);
        Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: "signin is failed",
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

  const handleChangeText = (fieldKey, text) => {
    setUserData((prev) => ({ ...prev, [fieldKey]: text }))
    // console.log(Userdata)/
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
          <Imports.SafeAreaView style={[styles.root, { flex: 1 }]}>
            <Imports.ScrollView
              contentContainerStyle={[styles.scrollContainer,]}
              keyboardShouldPersistTaps="handled"
            >
              <Imports.View style={styles.centeredContent}>
                <Imports.Text style={styles.signupText}>Welcome back!</Imports.Text>
                <Imports.View style={styles.inputContainer}>
                  <GlobalInputField fieldKey="email" placeholder="Email" labell="Email" value={userData.email} handleChangeText={handleChangeText} error={userDataError.emailError ? "Enter a valid email" : ""} secure={false} captial="none" labelColor="white" />
                  <GlobalInputField fieldKey="password" placeholder="Password" labell="Password" value={userData.password} handleChangeText={handleChangeText} error={userDataError.passwordError ? "Password have atleast 6 characters" : ""} secure={true} captial="none" labelColor="white" />
                </Imports.View>
                <Imports.View style={styles.buttonWidth}>
                  <GlobalButton btnTitle="Signin" handleButtonPressed={handleButtonPressed} />
                </Imports.View>
                <Imports.View >
                  <Imports.Text style={styles.loginText} onPress={() => { navigation.navigate("Signup") }} >Don't have an account ? Register now</Imports.Text>
                </Imports.View>
              </Imports.View>
            </Imports.ScrollView>
          </Imports.SafeAreaView>
        </Imports.KeyboardAvoidingView>
      </Imports.ImageBackground>

    </>
  )
}

export default SigninScreen

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
  centeredContent: {
    width: '100%',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

})