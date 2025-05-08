
import * as types from "../actions/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const postAppointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.POST_APPOINTMENT_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.POST_APPOINTMENT_DATA_SUCCESS:
        console.log("this is postAppointmentReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.POST_APPOINTMENT_DATA_ERROR:
        console.log("this is postAppointmentReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
