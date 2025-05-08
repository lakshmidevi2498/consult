import React, { useEffect, useState } from 'react'
import { Imports } from '../utilities/GlobalImports'
import GlobalStyles from '../utilities/GlobalStyles'
import GlobalInputField from '../components/GlobalInputField'
import GlobalButton from '../components/GlobalButton'
import { launchCameraAsync, launchImageLibraryAsync, PermissionStatus, } from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import {useDispatch, useSelector} from 'react-redux'
import { putDoctorInitiate } from '../redux/actions/putDoctorAction'
import {getDoctorInitiate} from '../redux/actions/getDoctorAction'
import { postDoctorInitiate } from '../redux/actions/postDoctorAction'
import * as FileSystem from 'expo-file-system';

const MAX_IMAGE_SIZE_MB = 2;

const AddDoctor = ({ route }) => {
  const navigation = useNavigation()
  const dispatch= useDispatch()
  const [itemId, setItemId] = useState(null);
  const [baseString, setBaseString] = useState(null)
  const [doctorData, setDoctorData] = useState({
    name: "",
    role: "",
    email: "",
    phoneNumber: "",
    experience: "",
    availableDays: "",
    availableTime: "",
    consultationFee: "",
    bio: "",
    profileImage: ""
  });

  const [doctorDataError, setDoctorDataError] = useState({
    nameError: "",
    roleError: "",
    emailError: "",
    phoneNumberError: "",
    experienceError: "",
    availableDaysError: "",
    availableTimeError: "",
    consultationFeeError: "",
    bioError: "",
    profileImageError: ""


  })

  const editData = useSelector((state)=>state.putdoctor.data)
console.log("editData",editData)
const postData = useSelector((state)=>state.postdoctor.data)
console.log("postData",postData)

  useEffect(() => {
    const item = route?.params?.item;
    console.log("item------>", item);

    if (item) {
      setItemId(item.id);
      setDoctorData({
        name: item.name || "",
        role: item.role || "",
        email: item.email || "",
        phoneNumber: item.phoneNumber || "",
        experience: item.experience || "",
        availableDays: item.availableDays || "",
        availableTime: item.availableTime || "",
        consultationFee: item.consultationFee || "",
        bio: item.bio || "",
        profileImage: item.profileImage || ""
      });
    }
  }, [route?.params?.item]);



  const handleChangeText = (fieldKey, enteredText) => {
    let text = enteredText;

    if (['phoneNumber', 'consultationFee', 'experience'].includes(fieldKey)) {
      text = enteredText.replace(/[^0-9]/g, '');
    }

    setDoctorData((prev) => ({ ...prev, [fieldKey]: text }));


    setDoctorDataError((prevErrors) => {
      const newErrors = { ...prevErrors };

      switch (fieldKey) {
        case 'name':
          newErrors.nameError = text ? "" : "Name is required";
          break;
        case 'role':
          newErrors.roleError = text ? "" : "Role is required";
          break;
        case 'email':
          newErrors.emailError =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text) ? "" : "Invalid email";
          break;
        case 'phoneNumber':
          newErrors.phoneNumberError =
            /^[6-9]\d{9}$/.test(text) ? "" : "Invalid phone number";
          break;
        case 'experience':
          newErrors.experienceError = /^\d+$/.test(text) ? "" : "Enter valid experience";
          break;
        case 'availableDays':
          newErrors.availableDaysError = text ? "" : "Required";
          break;
        case 'availableTime':
          newErrors.availableTimeError = text ? "" : "Required";
          break;
        case 'consultationFee':
          newErrors.consultationFeeError = /^\d+$/.test(text) ? "" : "Invalid fee";
          break;
        case 'bio':
          newErrors.bioError = text ? "" : "Bio is required";
          break;
        case 'profileImage':
          newErrors.profileImageError = text ? "" : "Required";
          break;
        default:
          break;
      }

      return newErrors;
    });
  };



  const handleButtonPressed = async () => {
    try {
      const errors = {
        nameError: !doctorData.name,
        roleError: !doctorData.role,
        emailError: !doctorData.email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(doctorData.email),
        phoneNumberError: !doctorData.phoneNumber || !/^[6-9]\d{9}$/.test(doctorData.phoneNumber),
        experienceError: !doctorData.experience || !/^\d+$/.test(doctorData.experience),
        availableDaysError: !doctorData.availableDays,
        availableTimeError: !doctorData.availableTime,
        consultationFeeError: !doctorData.consultationFee || !/^\d+$/.test(doctorData.consultationFee),
        bioError: !doctorData.bio,
        profileImageError: !doctorData.profileImage,
      };

      setDoctorDataError(errors);



      const hasError = Object.values(errors).some(Boolean);
      if (hasError) {
        Imports.Alert.alert("Validation Error", "Please correct the highlighted fields.");
        return;
      }
      await dispatch(postDoctorInitiate(doctorData, navigation))
      await dispatch(getDoctorInitiate())
      
      Toast.show({
        type: 'success',
        text1: 'success',
        text2: "doctor profile added successfully",
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
    
    } catch (error) {
      console.log("Post Error:", error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "Failed to submit doctor profile",
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
  };


  const handleImageUpload = async () => {
    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5, // keep compression
      base64: false, // we’ll only get base64 if size is OK
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
  
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
  
      const sizeInMB = fileInfo.size / (1024 * 1024);
  
      if (sizeInMB > MAX_IMAGE_SIZE_MB) {
        setDoctorDataError((prev) => ({
          ...prev,
          profileImageError: true,
          profileImageErrorMessage: 'Image size should be less than 2MB',
        }));
        return;
      }
  
      // If size is fine, get base64
      const base64Result = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const base64String = base64Result;
  
      setBaseString(base64String);
      setDoctorData((prev) => ({
        ...prev,
        profileImage: `data:image/jpeg;base64,${base64String}`,
      }));
      setDoctorDataError((prev) => ({
        ...prev,
        profileImageError: false,
        profileImageErrorMessage: '',
      }));
    }
  };
  const handleUpdateDetails = async () => {
    try {
      await dispatch(putDoctorInitiate(itemId,doctorData,navigation))
      await dispatch(getDoctorInitiate())
      Toast.show({
        type: 'success',
        text1: 'success',
        text2: "doctor profile edited successfully",
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



    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "Failed to edit doctor profile",
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
      console.log("error", error)
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
            <Imports.ScrollView contentContainerStyle={GlobalStyles.scrollContainer}>

              <Imports.View style={styles.formWrapper}>
                <Imports.View style={{marginVertical:15}}>
                  <Imports.Text style={{fontSize:22,color:"white" ,fontWeight:"bold" }}>{route?.params?.item ? "Edit Doctor Profile" : "Add Doctor Profile"}</Imports.Text>
                </Imports.View>
                <Imports.View style={styles.inputContainer}>
                  <GlobalInputField fieldKey="name" placeholder="Name" labell="Name" value={doctorData.name} handleChangeText={handleChangeText} error={doctorDataError.nameError ? "Enter a your name" : ""} secure={false} captial="word" labelColor="white" />
                </Imports.View>
                <Imports.View style={styles.inputContainer}>
                  <GlobalInputField fieldKey="role" placeholder="Role" labell="Role" value={doctorData.role} handleChangeText={handleChangeText} error={doctorDataError.roleError ? "Enter a your role" : ""} secure={false} captial="word" labelColor="white" />
                </Imports.View>
                <Imports.View style={styles.inputContainer}>
                  <GlobalInputField fieldKey="email" placeholder="Email" labell="Email" value={doctorData.email} handleChangeText={handleChangeText} error={doctorDataError.emailError ? "Enter a your email" : ""} secure={false} captial="none" labelColor="white" />
                </Imports.View>
                <Imports.View style={styles.inputContainer}>
                  <GlobalInputField fieldKey="phoneNumber" placeholder="Phone Number" labell="Phone Number" value={doctorData?.phoneNumber} handleChangeText={handleChangeText} error={doctorDataError.phoneNumberError ? "Enter a valid phonenumber ,ir starts with 6,7,8,9" : ""} secure={false} captial="none" labelColor="white" />
                </Imports.View>
                <Imports.View style={styles.inputContainer}>
                  <GlobalInputField fieldKey="experience" placeholder="Your Experience" labell="Experience" value={doctorData.experience} handleChangeText={handleChangeText} error={doctorDataError.experienceError ? "Enter a your experience" : ""} secure={false} captial="none" labelColor="white" />
                </Imports.View>
                <Imports.View style={styles.inputContainer}>
                  <GlobalInputField fieldKey="availableDays" placeholder="available Days ( Mon-Fri )" labell="Available Days" value={doctorData.availableDays} handleChangeText={handleChangeText} error={doctorDataError.availableDaysError ? "Enter a your available Days" : ""} secure={false} captial="none" labelColor="white" />
                </Imports.View>
                <Imports.View style={styles.inputContainer}>
                  <GlobalInputField fieldKey="availableTime" placeholder="available Time (9:00 AM - 6:00 PM) " labell="Available Time" value={doctorData.availableTime} handleChangeText={handleChangeText} error={doctorDataError.availableTimeError ? "Enter a your available Time" : ""} secure={false} captial="none" labelColor="white" />
                </Imports.View>
                <Imports.View style={styles.inputContainer}>
                  <GlobalInputField fieldKey="consultationFee" placeholder="consultation Fee" labell="consultation Fee" value={doctorData.consultationFee} handleChangeText={handleChangeText} error={doctorDataError.consultationFeeError ? "Enter a your consultation Fee" : ""} secure={false} captial="none" labelColor="white" />
                </Imports.View>
                <Imports.View style={styles.inputContainer}>
                  <GlobalInputField fieldKey="bio" placeholder=" Share your Bio" labell="Share your Bio" value={doctorData.bio} handleChangeText={handleChangeText} error={doctorDataError.bioError ? "Enter a your bio" : ""} secure={false} captial="none" labelColor="white" />
                </Imports.View>
                <Imports.View style={{ padding: 20 }}>
  <Imports.Text style={{ marginBottom: 10, fontWeight: 'bold', color: "white" ,textAlign:"center"}}>
    Upload Profile Image
  </Imports.Text>

  <Imports.TouchableOpacity
    onPress={handleImageUpload}
    style={{
      borderWidth: 2,
      // borderStyle: 'dashed',
      borderColor: doctorDataError.profileImageError ? 'red' : 'white',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: '#ffffff',
    }}
  >
    <Imports.Text style={{ color: "black" }}>
      {doctorData.profileImage ? "Change Image" : "Select Image"}
    </Imports.Text>
  </Imports.TouchableOpacity>

  {doctorData.profileImage && (
    <Imports.Image
      source={{ uri: doctorData.profileImage }}
      style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 15,
        alignSelf: "center",
        borderWidth: 2,
        borderColor: "white"
      }}
    />
  )}

  {doctorDataError.profileImageError && (
    <Imports.Text style={{ color: 'red', marginTop: 5 }}>
      {doctorDataError.profileImageErrorMessage || "Please upload a profile image"}
    </Imports.Text>
  )}
</Imports.View>


                <Imports.View style={[GlobalStyles.buttonWidth, styles.inputContainer, { marginBottom: 50 }]}>
                  <GlobalButton btnTitle={itemId === null ? "Add" : "Update"} handleButtonPressed={itemId === null ? handleButtonPressed : handleUpdateDetails} />
                </Imports.View>
              </Imports.View>

            </Imports.ScrollView>
          </Imports.SafeAreaView>
        </Imports.KeyboardAvoidingView>
      </Imports.ImageBackground>
    </>
  )
}

export default AddDoctor;
const styles = Imports.StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...Imports.StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1,
  },
  root: {
    flex: 1,
    zIndex: 2,
    width: "100%"
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 30,
    textAlign: "center",
    color: "#fff",
    marginBottom: 10,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 10,
    display: "flex",
  },
  formWrapper: {
    alignItems: 'center',
    width: '100%',
  
  },
  imageUploadBox: {
    height: 120,
    width: 120,
    backgroundColor: '#eee',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  imageUploadText: {
    textAlign: 'center',
    color: '#555',
  },

  uploadedImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },


});
