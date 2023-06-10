import {  useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';


const useAxiosSecure = () => {
  
  const { logOut: LogOut } = useAuth(); 
  const navigate = useNavigate(); 

  const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', 
  });

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("useAxiosSecure:", error.response.status)
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