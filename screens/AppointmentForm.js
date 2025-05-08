import React, { useEffect, useState } from 'react'
import { Imports } from '../utilities/GlobalImports'
import GlobalStyles from '../utilities/GlobalStyles'
import { Calendar } from 'react-native-calendars';
import GlobalButton from '../components/GlobalButton';
import { colors } from '../utilities/GlobalColors';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalInputField from '../components/GlobalInputField';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux'
import { postAppointmentInitiate } from '../redux/actions/postAppointmentAction';
import {getAppointmentInitiate} from '../redux/actions/getAppointmentAction'

const AppointmentForm = ({navigation,route}) => {
const dispatch = useDispatch()

  const [date, setDate] = useState(todayStr);
  const [slot, setSlot] = useState(null)
  const [item, setItem] = useState(null)

  const [patientData , setPatientData] = useState({
    patientName:"",
    phoneNumber:""
  });
  const [patientDataError , setPatientDataError] = useState({
    patientNameError:"",
    phoneNumberError:""
  })


  useEffect(() => {
    const { item } = route.params;
    // console.log("item",item)
    setItem(item)
  }, []);

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];


  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + 1);
  const maxDateStr = futureDate.toISOString().split('T')[0];

  const slots = [
    "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:30 PM", "03:00 PM",
    "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM",
  ]

  const handleButtonPressed = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const uid = await AsyncStorage.getItem('uid');
  
      const options = {
        description: 'Booking doctor appointment',
        image: 'https://docpulse.com/wp-content/uploads/2024/02/slider-small-1.jpg',
        currency: 'INR',
        key: 'rzp_test_mqSCiPTo2G5Peh',
        amount: item.consultationFee * 100,
        name: patientData.patientName,
        // order_id: 'order_xxxxxxxxxxxxxx',
        prefill: {
          email: email,
          contact: patientData.phoneNumber,
          name: patientData.patientName,
        },
        theme: { color: colors.primary500 },
      };
  
      RazorpayCheckout.open(options)
        .then(async (data) => {
          console.log("Razorpay data", data);

          const appointmentData = {
            todatDate: new Date(),
            usename: patientData.patientName,
            phoneNumber: patientData.phoneNumber,
            date: date,
            slot: slot,
            payment: item.consultationFee,
            razorpayPaymentId: data.razorpay_payment_id,
            doctor: item.name,
            uid:uid
          };
    
          await dispatch(postAppointmentInitiate(appointmentData,navigation))
          await dispatch(getAppointmentInitiate())
        
            Toast.show({
                type: 'success',
                text1: 'success',
                text2: "Appointment was booked successfully",
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
    
        
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: error,
            text2: "Booking Appointment failed",
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
  
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "Booking Appointment failed",
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
  

  const handleChangeText = (fieldKey,enteredText) => {
    // console.log("enteredText",enteredText)
    setPatientData((prevData)=>({...prevData , [fieldKey]:enteredText}));
    setPatientDataError((prevErrors) => {
      const newErrors = { ...prevErrors };
  
      switch (fieldKey) {
        case 'patientName':
          newErrors.patientNameError = enteredText ? "" : "Name is required";
          break;
        case 'phoneNumber':
          newErrors.phoneNumberError =
            /^[6-9]\d{9}$/.test(enteredText) ? "" : "Invalid phone number";
          break;
       default:
          break;
      }
      return newErrors;
    });

  }

 

  return (
    <Imports.View style={GlobalStyles.mainContainer}>
      <Imports.SafeAreaView style={{ flex: 1,marginBottom:10  }}>
        <Imports.ScrollView style={[GlobalStyles.scrollContainer]} showsVerticalScrollIndicator={false}>
          <Imports.View style={styles.containerr}>
            <Imports.Image source={{ uri: item?.profileImage }} style={[styles.image, { borderColor: "gray", borderWidth: 1 }]} resizeMode='cover' />
          </Imports.View>
          <Imports.View style={{marginBottom:10}}>
            <Imports.Text style={{ fontSize: 18, marginVertical: 5, fontWeight: "bold", textAlign: "center" }}>{item?.name}</Imports.Text>
            <Imports.Text style={{ fontSize: 16, fontWeight: 500, textAlign: "center" }}>consultation Fee:{item?.consultationFee}</Imports.Text>

          </Imports.View>
          <Imports.View style={{alignItems:"center",marginVertical:10,}}>
          <Imports.View style={styles.inputContainer}>
                <GlobalInputField fieldKey= "patientName" placeholder="Patient Name" labell="Patient Name" value={patientData?.patientName} handleChangeText={handleChangeText} error={patientDataError.patientNameError ? "Enter your name" : ""} secure={false} captial="word" labelColor="black" />
              </Imports.View>
              <Imports.View style={styles.inputContainer}>
                <GlobalInputField fieldKey= "phoneNumber" placeholder="Phone Number" labell="Phone Number" value={patientData?.phoneNumber} handleChangeText={handleChangeText} error={patientDataError.phoneNumberError ? "Enter a valid phonenumber ,it starts with 6,7,8,9" : ""} secure={false} captial="none" labelColor="black"/>
              </Imports.View>
          </Imports.View>
          <Imports.Text style={GlobalStyles.boldText}>Choose your preferred Day: {date}</Imports.Text>
          <Calendar
            current={todayStr}
            minDate={todayStr}
            maxDate={maxDateStr}
            onDayPress={day => {
              setDate(day.dateString);
            }}
            markedDates={{
              [date]: {
                selected: true,
                marked: true,
                selectedColor: colors.primary500,
              },
            }}
          />
          <Imports.Text style={[GlobalStyles.boldText, { marginTop: 15, marginBottom: 10 }]}>Choose your preferred time slot: {slot}</Imports.Text>
          <Imports.View style={styles.slotWrapper}>
            {slots.map((item, index) => (
              <Imports.View key={index} style={styles.container}>
                <Imports.Text style={[styles.slot, { backgroundColor: slot === item ? colors.primary500 : "transparent", color: slot === item ? "white" : "black" }]} onPress={() => setSlot(item)}>{item}</Imports.Text>
              </Imports.View>
            ))}
          </Imports.View> 

           {(date && slot && patientData.patientName && patientData.phoneNumber) && (
            <Imports.Text style={[GlobalStyles.title, { fontSize: 18, lineHeight: 30,fontWeight:"medium" }]}>
            Your appointment has been successfully scheduled for{' '}
            <Imports.Text style={[GlobalStyles.title, { fontSize: 18, lineHeight: 30, }]}>{date}</Imports.Text>
            {' '}at{' '}
            <Imports.Text style={[GlobalStyles.title, { fontSize: 18, lineHeight: 30, }]}>{slot}</Imports.Text>.
          </Imports.Text>
          
          )}

<Imports.View style={[GlobalStyles.buttonWidth, ]}>
  <Imports.Button
    title={`Complete Booking and Pay ₹ ${item?.consultationFee}`}
    onPress={handleButtonPressed}
    disabled={!date || !slot || !patientData.patientName || !patientData.phoneNumber}
    color= "#069fb4"
  />
</Imports.View>

          


        </Imports.ScrollView>
      </Imports.SafeAreaView>
    </Imports.View>
  );
};

export default AppointmentForm;

const styles = Imports.StyleSheet.create({
  slotWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // or 'flex-start'
    rowGap: 10,
    columnGap: 10,
    padding: 10,
  },
  container: {
    width: '30%',
    marginBottom: 10,
  },
  slot: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: "bold"
  },
  containerr: {
    width: "100%",
    justifyContent:"center",
    alignItems:"center"
},
image: {
    width: 100,
    height: 100,
    borderRadius: 50
},
inputContainer: {
  width: "100%",
  marginBottom: 10,
  display: "flex",
},
});

