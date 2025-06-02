import axios from 'axios';
import { version } from 'react';
const axiosInstance = axios.create({
  // local instance of firebase function
  // baseURL: "http://127.0.0.1:5001/fir-f8569/us-central1/api",

  // deployed version of amazon server on render.com

  baseURL: "https://amazon-api-xt5e.onrender.com",


});

export  {axiosInstance};