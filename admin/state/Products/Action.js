import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_ALL_BRAND_FAILURE,
  GET_ALL_BRAND_REQUEST,
  GET_ALL_BRAND_SUCCESS,
  GET_ALL_CATEGORY_FAILURE,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCTS_FAILURE,
  GET_SINGLE_PRODUCTS_REQUEST,
  GET_SINGLE_PRODUCTS_SUCCESS,
} from "./ActionType";
import { API_BASE_URL, api } from "@/config/apiConfig";

export const getProducts = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}admin/product/get-all`);
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const getAllBrand = () => async (dispatch) => {
  dispatch({ type: GET_ALL_BRAND_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}admin/brand/get-all`);
    dispatch({ type: GET_ALL_BRAND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_BRAND_FAILURE, payload: error.message });
    console.log(error)
  }
};

export const getAllCategory = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CATEGORY_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}admin/category/get-all`);
    dispatch({ type: GET_ALL_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_CATEGORY_FAILURE, payload: error.message });
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_PRODUCTS_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}admin/product/get-by-id?productId=${id}`);
    dispatch({ type: GET_SINGLE_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SINGLE_PRODUCTS_FAILURE, payload: error.message });
  }
};