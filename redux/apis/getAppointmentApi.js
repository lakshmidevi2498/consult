import API from "../../API/API";
const api = new API();
const endPoints = "appointments.json";
export const getAppointmentApi = async (token, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is post call in API---->",endPoints);
      const response = await api.get(`${endPoints}`);
      if (response.data) {
        const getData = Object.keys(response.data).map(key => ({
          id: key,
          ...response.data[key],
        }));
        console.log("getData",getData)
      resolve(getData);
      }
   
    } catch (error) {
      console.error("Error in loadCartApi:", error);
      reject(error);
    }
  });
};
