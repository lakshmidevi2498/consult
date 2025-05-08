import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './screens/SignupScreen';
import SigninScreen from './screens/SigninScreen';
import HomeScreen from './screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import DoctorsScreen from './screens/DoctorsScreen';
import DoctorDetailsScreen from './screens/DoctorDetailsScreen';
import { Ionicons } from '@expo/vector-icons'
import AppointmentForm from './screens/AppointmentForm';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './utilities/GlobalColors';
import AppointmentsScreen from './screens/AppointmentsScreen';
import AddDoctor from './screens/AddDoctor';
import { Imports } from './utilities/GlobalImports';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
  
    checkLoginStatus();
  }, []);
  const checkLoginStatus = async () => {
    const userToken = await AsyncStorage.getItem('accessToken');
    setIsLoggedIn(userToken);
    setIsLoading(false);
  };


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }



  function HomeTabs() {
    return (
      
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary500,
          tabBarStyle: { backgroundColor: '#f8f8f8' },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
          }}
        />
        <Tab.Screen
  name="doctors"
  component={DoctorsScreen}
  options={({ navigation }) => ({
    headerShown: true,
    tabBarLabel: 'Doctors',
    title: "Top Doctors",
    headerRight: () => (
      <Imports.TouchableOpacity >
      <Ionicons
        name="add"
        size={24}
        style={{ marginRight: 20 }}
        onPress={() => navigation.navigate('addDoctor')}
      />
      </Imports.TouchableOpacity>
    ),
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="medkit" color={color} size={size} />
    ),
  })}
/>

        <Tab.Screen
          name="AppointmentTab"
          component={AppointmentsScreen}
          options={{
            headerShown: true,
            title:"Your Appointments",
            tabBarLabel: 'Appointments',
            tabBarIcon: ({ color, size }) => <Ionicons name="reader" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    );
  }
  

  return (
    <>
    {/* <StatusBar style='dark'/> */}
    <NavigationContainer>
  <Stack.Navigator initialRouteName={isLoggedIn !== null ? 'Home' : 'Signup'}>
  <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
  <Stack.Screen  name="doctors"  component={DoctorsScreen}  options={({ navigation }) => ({  title: "Top Doctors",  contentStyle: { backgroundColor: "rgb(203, 205, 205)" },
    headerRight: () => (
      <Imports.TouchableOpacity >
      <Ionicons  name="add"   size={24}   style={{ marginRight: 20 }}   onPress={() => navigation.navigate('addDoctor')}   />
      </Imports.TouchableOpacity>     
    ),
  })}
/>
  <Stack.Screen name="doctordetails" component={DoctorDetailsScreen} options={{ title: "Doctor Details", contentStyle: { backgroundColor: "rgb(203, 205, 205)" }, headerRight: () => <Ionicons name="ellipsis-vertical" size={24} /> }} />
  <Stack.Screen name="addDoctor" component={AddDoctor} options={{ headerShown: false }} />
  <Stack.Screen name="bookappointment" component={AppointmentForm} options={{ title: "Book Your Appointment", contentStyle: { backgroundColor: "rgb(203, 205, 205)" } }} />
</Stack.Navigator>
</NavigationContainer>
<Toast />

    </>
  );
}
