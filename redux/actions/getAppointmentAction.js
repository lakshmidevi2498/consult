import { getAppointmentApi } from '../apis/getAppointmentApi'
import * as types from './actionTypes'

export const getAppointmentStart= () => ({
type:types.GET_APPOINTMENT_DATA_START
})

export const getAppointmentSuccess = (data) => (
    console.log("this is getAppointmentSuccessAction---->" ,data),
    {
    type:types.GET_APPOINTMENT_DATA_SUCCESS,
    payload:data
})

export const getAppointmentError = (error) => (
    console.log("this is getAppointmentErrorAction---->" ,error),
    {
    type:types.GET_APPOINTMENT_DATA_ERROR,
    payload:error
})

export const getAppointmentInitiate = (token,userId) => {
    return async (dispatch)=>{
        dispatch(getAppointmentStart())
        try {
          const getAppointmentdata = await getAppointmentApi(token,userId)
          dispatch(getAppointmentSuccess(getAppointmentdata))
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(getAppointmentError(err))
          toast.error("getting products data failed")
  
        }
    }
}