import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lab-des-soft.onrender.com/api/task', // Altere para o seu endpoint
});

export default api;
