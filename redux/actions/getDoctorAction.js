import { getDoctorApi } from '../apis/getDoctorApi'
import * as types from './actionTypes'

export const getDoctorStart = () => {
  return {
    type: types.GET_DOCTOR_DATA_START,
  };
};

export const getDoctorSuccess = (data) => {
  console.log("this is getDoctorSuccessAction---->", data);
  return {
    type: types.GET_DOCTOR_DATA_SUCCESS,
    payload: data,
  };
};

export const getDoctorError = (error) => {
  console.log("this is getDoctorErrorAction---->", error);
  return {
    type: types.GET_DOCTOR_DATA_ERROR,
    payload: error,
  };
};



export const getDoctorInitiate = () => {
    return async (dispatch)=>{
        dispatch(getDoctorStart())
        try {
          const getDoctordata = await getDoctorApi()
          dispatch(getDoctorSuccess(getDoctordata))
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(getDoctorError(err))
          toast.error("getting products data failed")
  
        }
    }
}