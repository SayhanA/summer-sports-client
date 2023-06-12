import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';


const useAxiosSecure = () => {

  const { LogOut } = useAuth();
  // const { logOut: LogOut } = useAuth(); 
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: 'https://b7a12-summer-camp-server-side-sayhan-a.vercel.app',
  });

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      // console.log("access token from localStorage",token)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("useAxiosSecure:", error?.response?.status)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Problem(error)--1: LogOut() is not a function 
          await LogOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  }, [LogOut, navigate, axiosSecure]);

  return [axiosSecure];
};

export default useAxiosSecure;