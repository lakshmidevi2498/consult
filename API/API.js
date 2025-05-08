import axios from "axios";
import { BASE_URL, STATUS_CODE } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
const METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};
 
class API {
  constructor() {
    this.baseURL = BASE_URL;
  }
 
  async get(url, data) {
    return new Promise((resolve, reject) => {
      console.log('this is getAPI');
      this.api(METHOD.GET, url, data)     
        .then((response) => {
          resolve(response);
          // if(response.data){
          //   toast.success(" get request successfully",response);
            
          // }
          // else{
          //   toast.error("Get Request Failed",response);
          // }
          // console.log("this is response2",response)
        })
        .catch((error) => {
          // toast.error("Something went wrong"); 
          console.log(error);
        });
    });

  }
 
  post(url, data) {
    return new Promise((resolve, reject) => {
      console.log('this is postAPI');
      this.api(METHOD.POST, url, data)
        .then((response) => {
           if(response.data){
            // toast.success(" post request successfully");
            resolve(response);
          }
          else{
            // toast.error("post Request Failed",);
          } 
        })
        .catch((error) => {
          // toast.error("Something went wrong"); 
          console.log(error);
        });
    });
  }
  put(url, data) {
    return new Promise((resolve, reject) => {
      console.log('this is putAPI');
      this.api(METHOD.PUT, url, data)
        .then((response) => {
          // toast.success(" update request successfully");
          resolve(response);
        })
        .catch((error) => {
          // toast.error("Something went wrong"); 
          console.log(error);
        });
    });
  }
  delete(url, data) {
    return new Promise((resolve, reject) => {
      console.log('this is deleteAPI');
      this.api(METHOD.DELETE, url, data)
        .then((response) => {
          // toast.success(" delete request successfully");
          resolve(response);
        })
        .catch((error) => {
          // toast.error("Something went wrong"); 
          console.log(error);
        });
    });
  }
  // Main function with hold the axios request param
  api(method, url, data) {
    return new Promise(( resolve,reject) => {
      console.log('this is mainAPI function');
      let axiosConfig = {};
      axiosConfig.method = method;
      axiosConfig.url = this.baseURL + url;
      axiosConfig.headers = this.setHeaders(data);
      
      //  console.log("axiosConfig.headers", axiosConfig.headers);
      if (data) {
        if (data) axiosConfig.data = data;
      }
 
      axios(axiosConfig)
  .then((response) => {
    if (response && response.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
      const errorMessage = response.data.message  ;
      // toast.error(errorMessage);
    } else {
      resolve(response);
      const successMessage = response.data.message;
      // toast.success(successMessage);
    }
  })
  .catch((error) => {
    console.log("ERROR:", error);

    // Extract error message
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message || "An unexpected error occurred.";

    // Display error toast
    // toast.error(errorMessage);

    reject(error); // Pass the error for further handling if needed
  });

    });
  }
  // Set the header for request
  setHeaders(data) {
    let headers = {};
    console.log('this is headers');
    headers["accept-language"] = "en";
    headers["Content-Type"] = "application/json";
    headers["Accept"] = "application/json";
    headers["Authorization"] = AsyncStorage.getItem("accessToken");
    if (data) {
      if (data.isMultipart) {
        headers["Content-Type"] = "multipart/form-data";
      }
      if (data.headers) {
        for (var key in data.headers) {
          if (data.headers.hasOwnProperty(key)) {
            headers[key] = data.headers[key];
          }
        }
      }
    }
    return headers;
  }
}
export default API;




