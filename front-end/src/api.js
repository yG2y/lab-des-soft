import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8088/api/task',
  baseURL: 'https://lab-des-soft.onrender.com/api/task',
});


export default api;
