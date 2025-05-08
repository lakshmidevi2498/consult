import API from "../../API/API";
const api = new API();
const endPoints = "appointments.json";
export const postAppointmentApi = async (appointmentData) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is post call in API---->",endPoints);
      const response = await api.post(`${endPoints}`,appointmentData);
      console.log("fetched user in postAppointmentApi", response);
      console.log("fetched user in postAppointmentApi", response.data);
      resolve(response);
   
    } catch (error) {
      console.error("Error in postAppointmentApi:", error);
      reject(error);
    }
  });
};
