import API from "../../API/API";
const api = new API();
const endPoints = "doctors.json";
export const postDoctorApi = async (doctorData) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("this is post call in API---->",endPoints);
      const response = await api.post(`${endPoints}`,doctorData);
      console.log("fetched user in postAddressApi", response);
      console.log("fetched user in postAddressApi", response.data);
      resolve(response);
   
    } catch (error) {
      console.error("Error in postAddressApi:", error);
      reject(error);
    }
  });
};
