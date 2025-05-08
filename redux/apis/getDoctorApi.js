import API from "../../API/API";
import { Imports } from "../../utilities/GlobalImports";
const api = new API();
const endPoints = "doctors.json";
export const getDoctorApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log("this is post call in API---->",endPoints);
      const response = await api.get(`${endPoints}`);
      // console.log("fetched user in getDoctorApi", response);
      // console.log("fetched user in getDoctorApi", response.data);
      if (response.data) {
        const data = Object.keys(response.data).map(key => ({
          id: key,
          ...response.data[key],
        }));
      resolve(data);
      }
   
    } catch (error) {
      console.error("Error in getDoctorApi:", error);
      reject(error);
    }
  });
};
