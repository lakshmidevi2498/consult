import { putDoctorApi } from '../apis/putDoctorApi'
import * as types from './actionTypes'

export const putDoctorStart= () => ({
type:types.PUT_DOCTOR_DATA_START
})

export const putDoctorSuccess = (data) => (
    console.log("this is putDoctorSuccessAction---->" ,data),
    {
    type:types.PUT_DOCTOR_DATA_SUCCESS,
    payload:data
})

export const putDoctorError = (error) => (
    console.log("this is putDoctorErrorAction---->" ,error),
    {
    type:types.PUT_DOCTOR_DATA_ERROR,
    payload:error
})

export const putDoctorInitiate = (itemId,doctorData,navigation) => {
    return async (dispatch)=>{
        dispatch(putDoctorStart())
        try {
          const putDoctordata = await putDoctorApi(itemId,doctorData)
          dispatch(putDoctorSuccess(putDoctordata))
          // toast.success("product is added to cart ")
         navigation.goBack()
  
        } catch (err) {
          console.log("error",err)
          dispatch(putDoctorError(err))
          toast.error("getting products data failed")
  
        }
    }
}