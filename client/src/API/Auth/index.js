// import axios from 'axios';

// const API = axios.create({ baseURL: 'https://notionofnetizen.herokuapp.com/' });

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('profile')) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
//     return req;

    
// })


// export const signIn = (FormData) => API.post('api/user/signin', FormData);
// export const signUp = (FormData) => API.post('api/user/signup', FormData);