import { deleteDoctorApi } from '../apis/deleteDoctorApi'
import * as types from './actionTypes'

export const deleteDoctorStart= () => ({
type:types.DELETE_DOCTOR_DATA_START
})

export const deleteDoctorSuccess = (data) => (
    console.log("this is deleteDoctorSuccessAction---->" ,data),
    {
    type:types.DELETE_DOCTOR_DATA_SUCCESS,
    payload:data
})

export const deleteDoctorError = (error) => (
    console.log("this is deleteDoctorErrorAction---->" ,error),
    {
    type:types.DELETE_DOCTOR_DATA_ERROR,
    payload:error
})

export const deleteDoctorInitiate = (id) => {
    return async (dispatch)=>{
        dispatch(deleteDoctorStart())
        try {
          const deleteDoctordata = await deleteDoctorApi(id)
          dispatch(deleteDoctorSuccess(deleteDoctordata))
          // toast.success("product deleted from Doctor")
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(deleteDoctorError(err))
          toast.error("getting products data failed")
  
        }
    }
}