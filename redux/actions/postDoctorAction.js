import { postDoctorApi } from '../apis/postDoctorApi'
import * as types from './actionTypes'

export const postDoctorStart= () => ({
type:types.POST_DOCTOR_DATA_START
})

export const postDoctorSuccess = (data) => (
    console.log("this is postDoctorSuccessAction---->" ,data),
    {
    type:types.POST_DOCTOR_DATA_SUCCESS,
    payload:data
})

export const postDoctorError = (error) => (
    console.log("this is postDoctorErrorAction---->" ,error),
    {
    type:types.POST_DOCTOR_DATA_ERROR,
    payload:error
})

export const postDoctorInitiate = (doctorData,navigation) => {
    return async (dispatch)=>{
        dispatch(postDoctorStart())
        try {
          const postDoctordata = await postDoctorApi(doctorData)
          dispatch(postDoctorSuccess(postDoctordata))
          // toast.success("product is added to Doctor ")
          navigation.goBack();
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(postDoctorError(err))
          toast.error("getting products data failed")
  
        }
    }
}