
import * as types from "../actions/actionTypes"

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const postDoctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.POST_DOCTOR_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.POST_DOCTOR_DATA_SUCCESS:
        console.log("this is postDoctorReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.POST_DOCTOR_DATA_ERROR:
        console.log("this is postDoctorReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
