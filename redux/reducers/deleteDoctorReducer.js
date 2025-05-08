
import * as types from "../actions/actionTypes"

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const deleteDoctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DELETE_DOCTOR_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.DELETE_DOCTOR_DATA_SUCCESS:
        console.log("this is deleteDoctorReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.DELETE_DOCTOR_DATA_ERROR:
        console.log("this is deleteDoctorReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
