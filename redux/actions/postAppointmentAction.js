import { postAppointmentApi } from '../apis/postAppointmentApi'
import * as types from './actionTypes'

export const postAppointmentStart= () => ({
type:types.POST_APPOINTMENT_DATA_START
})

export const postAppointmentSuccess = (data) => (
    console.log("this is postAppointmentSuccessAction---->" ,data),
    {
    type:types.POST_APPOINTMENT_DATA_SUCCESS,
    payload:data
})

export const postAppointmentError = (error) => (
    console.log("this is postAppointmentErrorAction---->" ,error),
    {
    type:types.POST_APPOINTMENT_DATA_ERROR,
    payload:error
})

export const postAppointmentInitiate = (appointmentData,navigation) => {
    return async (dispatch)=>{
        dispatch(postAppointmentStart())
        try {
          const postAppointmentdata = await postAppointmentApi(appointmentData)
          dispatch(postAppointmentSuccess(postAppointmentdata))
          // toast.success("product is added to Appointment ")
          navigation.navigate('Home');
  
        } catch (err) {
          console.log("error",err)
          dispatch(postAppointmentError(err))
          toast.error("getting products data failed")
  
        }
    }
}