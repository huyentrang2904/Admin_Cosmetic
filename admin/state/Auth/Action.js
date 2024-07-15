import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS
} from "./ActionType";
import { API_BASE_URL, api } from "@/config/apiConfig";
import { toast } from "react-toastify";

function redirect() {
  window.location.href = '/login'
}

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}api/auth/signup`, userData);
    const user = response.data;
    dispatch({ type: REGISTER_SUCCESS, payload: user });
    toast.success("Đăng ký thành công!");
    setTimeout(redirect, 1000)
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error });
    toast.error(error?.response?.data.message);
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}api/auth/login`, userData);
    const user = response.data;
    localStorage.setItem('userInformation', JSON.stringify(user))
    localStorage.setItem('userToken', JSON.stringify(user.accessToken))
    toast.success("Login successfully!");
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    window.location = "/dashboard";
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
    toast.error("Username or password is wrong");
  }
};

export const changePassword = (req) => async (dispatch) => {
  console.log(req)
  dispatch({ type: CHANGE_PASSWORD_REQUEST })
  try {
    const { data } = await axios.put(`${API_BASE_URL}user/update`, req);
    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data });
    toast.success("Changed passwood successfully!");
  } catch (error) {
    dispatch({ type: CHANGE_PASSWORD_FAILURE, payload: error });
    console.log(error.response)
    toast.error(error?.response?.data.message);
  }
}