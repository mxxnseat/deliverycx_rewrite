import axios, { AxiosInstance, AxiosPromise, AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import {config} from "config";


class Api {
  static _instanse: null | Api = null
  private URL: string = config.REACT_APP_API_URL
  api: AxiosInstance

  private constructor() {
      this.api = axios.create({
          withCredentials: true,
          baseURL: this.URL,
      })
      this.api.interceptors.response.use((response: AxiosResponse)=>{
          return response;
      }, (err)=>{
          
          

          return Promise.reject(err);
      });
      
      this.api.interceptors.request.use((config: AxiosRequestConfig)=>{
          const token = localStorage.getItem("authToken");
          

          return config;
      });
  }
  static get getInstance() {
      if (!Api._instanse) {
          Api._instanse = new Api()
      }
      return Api._instanse
  }
}

export default Api;