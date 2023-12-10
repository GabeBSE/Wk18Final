// AxiosInstance.js
import axios from 'axios';

const apiKey = '9a54d3a'; // Replace with your actual API key

const axiosInstance = axios.create({
  baseURL: 'http://www.omdbapi.com',
  params: {
    apikey: apiKey,
  },
});

export default axiosInstance;


 
/* API key: http://www.omdbapi.com/?i=tt3896198&apikey=9a54d3a 

Send all data request to: http://www.omdbapi.com/?apikey=[yourkey]&

Poster API request: http://img.omdbapi.com/?apikey=[yourkey]&

*/  