import { useEffect, useRef, useState } from "react";
import { Imports } from "../utilities/GlobalImports";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../utilities/GlobalColors";
import { Ionicons } from '@expo/vector-icons'
import SwiperComponent from "../components/SwiperComponent";
import GlobalStyles from "../utilities/GlobalStyles";
import LottieView from 'lottie-react-native';
import { useNavigation } from "@react-navigation/native";
import {firebase} from '../firebase/firebaseConfig'
import Toast from "react-native-toast-message";

const HomeScreen = () => {
    const [username, setUsername] = useState("");
    const navigation = useNavigation()

    useEffect(() => {
       const name = AsyncStorage.getItem("username");
       setUsername(name)
    }, []);
    const scrollViewRef = useRef(null);
useEffect(() => {
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollTo({ y: 0, animated: true }); 
  }
}, []);

const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log("User signed out successfully");
          Toast.show({
              type: 'success',
              text1: 'success',
              text2: "signed out successfully",
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
        AsyncStorage.removeItem('accessToken')
        console.log("accessToken",AsyncStorage.getItem('accessToken'))
        // Optionally redirect user
        navigation.navigate('Signin');
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: "signed out failed",
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
      });
  };

    return (
        <>
            <Imports.View style={GlobalStyles.mainContainer}>
                <Imports.SafeAreaView style={{ flex: 1 }}>
                    <Imports.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={GlobalStyles.scrollContainer}  ref={scrollViewRef}>
                        <Imports.View>
                            <Imports.View style={styles.container}>
                                <Imports.View style={{justifyContent:"space-between",flexDirection:"row",alignItems:"center"}}>
                                <Imports.Text style={styles.username}>Welcome {username}!</Imports.Text>
                                <Imports.TouchableOpacity onPress={handleLogout}>
                                    <Ionicons name = "log-out-outline" size={24} />
                                    </Imports.TouchableOpacity>
                                </Imports.View>
                                <Imports.Image
                                    source={require("../assets/images/wallpaper1.jpg")}
                                    style={styles.wallpaper}
                                />
                                <Imports.Text style={styles.conentText}>Let's get started with scheduling your appointment today!</Imports.Text>
                           
                                <Imports.TouchableOpacity style={styles.borderView} onPress={() => navigation.navigate("doctors")}>
                                    <Imports.View>
                                        <Imports.Text style={GlobalStyles.boldText}>Find the Right Doctor for You</Imports.Text>
                                        <Imports.Text style={styles.despc}>find and connect with the right doctor now.</Imports.Text>
                                    </Imports.View>

                                    <Imports.View onPress={() => navigation.navigate("doctors")}>
                                        <Ionicons name="arrow-forward" size={24} color="#1A3A4A" />
                                    </Imports.View>

                                </Imports.TouchableOpacity>
                                <Imports.View>
                                    <Imports.Text style={GlobalStyles.title}>Our Management</Imports.Text>
                                </Imports.View>
                                <SwiperComponent />

                               
                               
                                <Imports.View >
                                    <Imports.View>
                                        <Imports.Text style={[GlobalStyles.boldText, { textAlign: "center", color: "#1A3A4A",marginTop:10 }]}>
                                            Health at Your Fingertips
                                        </Imports.Text>
                                        <Imports.Text style={[styles.despc, { textAlign: "center", color: colors.secondary400  }]}>
                                            Book online consultations  with trusted doctors.
                                        </Imports.Text>
                                    </Imports.View>
                                    <Imports.View style={{backgroundColor:"white",  borderColor: "lightgray",borderWidth: 1,borderRadius: 10, marginTop: 20,paddingHorizontal:7,    elevation: 5, shadowColor: "#000",  shadowOffset: { width: 2, height: 2 },  shadowOpacity: 0.25,  shadowRadius: 3.84,}}>
                                        <LottieView
                                            source={require('../assets/images/gif.json')} 
                                            autoPlay
                                            loop
                                            style={{ width: "100%", height: 300 }}
                                        />
                                    </Imports.View>


                                </Imports.View>

                                <Imports.View style={{}}>
                                    <Imports.View style={{ marginTop: 30, }}>
                                        <Imports.Text style={[GlobalStyles.boldText, { textAlign: "center", color: "#1A3A4A" }]}>
                                            Skip the Queue, Consult doctor
                                        </Imports.Text>
                                        <Imports.Text style={[styles.despc, { textAlign: "center", color: colors.primary500 }]}>
                                            Choose your time. Choose your doctor.
                                        </Imports.Text>


                                    </Imports.View>
                                    <Imports.View style={{backgroundColor:"#F2F2F2",  borderRadius: 10, marginTop: 20,paddingHorizontal:7}}>
                                        <Imports.Image
                                            source={{
                                                uri:
                                                    'https://static.vecteezy.com/system/resources/thumbnails/018/794/309/small_2x/health-insurance-concept-with-words-coverage-protection-risk-and-security-online-medicine-on-a-virtual-screen-and-a-cartoon-wood-hand-touching-a-button-isolated-on-blue-background-3d-rendering-png.png',
                                            }}
                                            resizeMode="cover"
                                            style={styles.image}
                                        />
                                    </Imports.View>


                                </Imports.View>
                            </Imports.View>

                        </Imports.View>

                    </Imports.ScrollView>
                </Imports.SafeAreaView>
            </Imports.View>

        </>
    );
};

export default HomeScreen;

const styles = Imports.StyleSheet.create({
    username: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.primary500,
        textAlign: "start",
        paddingVertical:20
    },
    wallpaper: {
        width: "100%",
        height: 500,
        position: "relative",
       borderRadius:8,
        shadowColor: "rgb(11, 207, 233)",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.9,
        shadowRadius: 20,
    },
    conentText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1A3A4A",
        textAlign: "left",
        position: "absolute",
        top: "5%",
        paddingHorizontal: "5%",
        lineHeight: 30,
    },
    borderView: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: "white",
        marginTop: 20,
        borderWidth: 1,
        borderColor: colors.primary300,
        elevation: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginTop: 10,
    },

    buttonWidth: {
        width: "40%",
        marginVertical: 10
    },
    loginText: {
        color: "white",
        fontSize: 16,
        fontWeight: "medium",
        marginTop: 10,
        textAlign: "center",
    },
  
    despc: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 20,
    },
   

});