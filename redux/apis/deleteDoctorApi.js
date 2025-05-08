import API from "../../API/API";
const api = new API();
// const endPoints = `doctors/${id}.json`;
export const deleteDoctorApi = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log("this is delete call in API---->",endPoints);
      const response = await api.delete(`doctors/${id}.json`);
      console.log("fetched user in deleteDoctorApi", response);
    //   console.log("fetched user in emailLoginApi", response.data.token);
      resolve(response);
   
    } catch (error) {
      console.error("Error in deleteDoctorApi:", error);
      reject(error);
    }
  });
};
