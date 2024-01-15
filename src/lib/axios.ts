import axios from 'axios'
import { getAuthToken } from './localStorage';
require('dotenv').config()


// todo - fix baseURL ???????? why is it not working

const baseUrl = 'http://localhost:3001/api/'

const axiosInstance =  axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || window.location.origin + '/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

class AxiosInstance {
  get(endpoint: string, includeToken = false) {
    return axiosInstance.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...(includeToken && { 'Authorization': `${getAuthToken()}` })
      }
    })
  }

  post(endpoint: string, data?: Record<string, any>, includeToken = false) {
    return axiosInstance.post(endpoint, data, {
      headers: {
        'Content-Type': 'application/json',
        ...(includeToken && { 'Authorization': `${getAuthToken()}` })
      }
    })
  }
}

const axiosObj = new AxiosInstance();
export default axiosObj;


export {axiosInstance};