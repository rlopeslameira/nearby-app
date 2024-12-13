import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.14:3333/',
  // baseURL: 'https://eatnow-b531ac35e06f.herokuapp.com/',
});

export default api;