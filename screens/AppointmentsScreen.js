import React, { useEffect, useState } from 'react';
import { Imports } from '../utilities/GlobalImports';
import GlobalStyles from '../utilities/GlobalStyles';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentInitiate } from '../redux/actions/getAppointmentAction';
import { useFocusEffect } from '@react-navigation/native';

const AppointmentsScreen = () => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  const loading = useSelector((state)=>state.getappointment.loading)
  const appointments = useSelector((state)=>state.getappointment.data)


    useFocusEffect(
      React.useCallback(() => {
        fetchAppointments(); 
      }, []) 
    );

  useEffect(() => {
    const fetchData = async () => {
      const uid = await AsyncStorage.getItem('uid');
      if (appointments) {
        // setLoading(false);
        const filterData = appointments.filter(item => item.uid === uid);
        console.log("filterData", filterData);
        setData(filterData);
      }
    };
  
    fetchData();
  }, [appointments]);
  

  const fetchAppointments = async () => {

    try {
      await dispatch(getAppointmentInitiate())

    } catch (error) {
      console.log("error", error)
    }
  }

  const formateDate = (date) => {
    if (date) {
      const dateObj = new Date(date);
      return dateObj.toISOString().split('T')[0]; 
    }
    return '';
  };

  const formateDay = (date) => {
    if (date) {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
    }
    return '';
  };





  if (loading) {
    return (
      <Imports.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </Imports.View>
    );
  }
  return (
    <>
      <Imports.View style={GlobalStyles.mainContainer}>
        <Imports.SafeAreaView style={{ flex: 1 ,marginBottom:10 }}>
          <Imports.ScrollView style={GlobalStyles.scrollContainer}>
            {data.length > 0 ? data.reverse().slice().map((item, index) => (
              <Imports.View style={styles.container} key={index}>
                 <Imports.View style={{ flexDirection: 'row', alignItems: 'center',  gap:2,marginBottom: 8,}}>
                 <Ionicons name="checkmark-circle" size={20} color="green" />
                <Imports.Text style={styles.titleText}>
                  Appointment Confirmed!

                  <Imports.Text style={styles.infoText}> on {formateDate(item.todatDate)}
                  </Imports.Text>
                </Imports.Text>
                </Imports.View>

                <Imports.Text style={styles.infoText}>{item?.usename}, you have successfully booked an appointment with
                </Imports.Text>

                <Imports.View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <Imports.Text style={styles.highlightText}>
                  <Ionicons name="medkit" size={16} color="gray" /> {item?.doctor}
                  <Imports.Text style={styles.infoText}>
                    {' '}on <Imports.Text style={styles.highlightText}>{formateDay(item?.date)}</Imports.Text> at{' '}
                    <Imports.Text style={styles.highlightText}> {item?.slot}
                    </Imports.Text>.
                  </Imports.Text>
                </Imports.Text>
                </Imports.View>
                <Imports.View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <Ionicons name="wallet" size={16} color="orange" style={{ marginRight: 5 }} />
                  <Imports.Text style={styles.infoText}>
                    You have paid: ₹{item?.payment} for the consultation.
                  </Imports.Text>
                </Imports.View>

              </Imports.View>
            )) : (
              <Imports.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <Imports.Text style={styles.titleText}>
    Appointment records are not yet found
  </Imports.Text>
</Imports.View>

            )}
          </Imports.ScrollView>
        </Imports.SafeAreaView>
      </Imports.View>
    </>
  );
};

export default AppointmentsScreen;

const styles = Imports.StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    borderColor: "lightgray",
    borderWidth: 1,
    marginBottom: 10
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  highlightText: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 15,
  },
});
