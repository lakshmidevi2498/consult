import { combineReducers } from "redux";
import { getDoctorReducer } from "./getDoctorReducer";
import { deleteDoctorReducer } from "./deleteDoctorReducer";
import { putDoctorReducer } from "./putDoctorReducer";
import { postDoctorReducer } from "./postDoctorReducer";
import { getAppointmentReducer } from "./getAppointmentReducer";
import { postAppointmentReducer } from "./postAppointmentReducer";

export const rootReducer = combineReducers(
    {
        getdoctor:getDoctorReducer,
        deletedoctor:deleteDoctorReducer,
        putdoctor:putDoctorReducer,
        postdoctor:postDoctorReducer,
        getappointment:getAppointmentReducer,
        postappointment:postAppointmentReducer,
    })