
import * as types from "../actions/actionTypes.js";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const getDoctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DOCTOR_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_DOCTOR_DATA_SUCCESS:
        console.log("this is getDoctorReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.GET_DOCTOR_DATA_ERROR:
        console.log("this is getDoctorReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
