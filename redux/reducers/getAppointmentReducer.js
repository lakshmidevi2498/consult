
import * as types from "../actions/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const getAppointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_APPOINTMENT_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_APPOINTMENT_DATA_SUCCESS:
        console.log("this is getAppointmentReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.GET_APPOINTMENT_DATA_ERROR:
        console.log("this is getAppointmentReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
