import {
  GET_ALL_BRAND_FAILURE,
  GET_ALL_BRAND_REQUEST,
  GET_ALL_BRAND_SUCCESS,
} from "../Products/ActionType";
import {
  ADD_BRAND_FAILURE,
  ADD_BRAND_REQUEST,
  ADD_BRAND_SUCCESS,
  GET_ALL_USER_FAILURE,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  DELETE_BRAND_FAILURE,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  CHANGE_ROLE_REQUEST,
  CHANGE_ROLE_SUCCESS,
  CHANGE_ROLE_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_BRAND_REQUEST,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_FAILURE,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_FAILURE,
  GET_ANALYTIC_REQUEST,
  GET_ANALYTIC_SUCCESS,
  GET_ANALYTIC_FAILURE,
  GET_ALL_PERMISSION_SUCCESS,
  GET_ALL_PERMISSION_FAILURE,
  GET_ALL_PERMISSION_REQUEST,
  GET_ALL_ROLE_REQUEST,
  GET_ALL_ROLE_SUCCESS,
  GET_ALL_ROLE_FAILURE,
  CREATE_ROLE_REQUEST,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAILURE,
  DELETE_ROLE_FAILURE,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_FAILURE,
  GET_ALL_COUPCON_FAILURE, 
  GET_ALL_COUPCON_REQUEST, 
  GET_ALL_COUPCON_SUCCESS,
  DELETE_COUPCON_FAILURE, 
  DELETE_COUPCON_REQUEST, 
  DELETE_COUPCON_SUCCESS,
  UPDATE_COUPCON_FAILURE, 
  UPDATE_COUPCON_REQUEST, 
  UPDATE_COUPCON_SUCCESS, 
  CREATE_SUB_ADMIN_ACCOUNT_FAILURE, 
  CREATE_SUB_ADMIN_ACCOUNT_SUCCESS,
  CREATE_SUB_ADMIN_ACCOUNT_REQUEST, 
  REMOVE_ACCOUNT_FAILURE, 
  REMOVE_ACCOUNT_REQUEST,
  REMOVE_ACCOUNT_SUCCESS,
  EDIT_ACCOUNT_FAILURE, 
  EDIT_ACCOUNT_REQUEST, 
  EDIT_ACCOUNT_SUCCESS, 
  CHANGE_ACCOUNT_STATUS_FAILURE, 
  CHANGE_ACCOUNT_STATUS_REQUEST, 
  CHANGE_ACCOUNT_STATUS_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_FAILURE,
  GET_SINGLE_ROLE_FAILURE,
  GET_SINGLE_ROLE_REQUEST,
  GET_SINGLE_ROLE_SUCCESS
} from "./ActionType";

const initialState = {
  isLoading: false,
  error: null,
};
export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_ROLE_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case CHANGE_ACCOUNT_STATUS_REQUEST:
    case REMOVE_ACCOUNT_REQUEST:
    case EDIT_ACCOUNT_REQUEST:
    case CREATE_SUB_ADMIN_ACCOUNT_REQUEST:
    case DELETE_COUPCON_REQUEST:
    case UPDATE_COUPCON_REQUEST:
    case GET_ALL_COUPCON_REQUEST:
    case UPDATE_CATEGORY_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case GET_ALL_BRAND_REQUEST:
    case DELETE_PRODUCT_REQUEST:
    case CHANGE_ROLE_REQUEST:
    case DELETE_BRAND_REQUEST:
    case ADD_BRAND_REQUEST:
    case UPDATE_BRAND_REQUEST:
    case GET_ALL_USER_REQUEST:
    case GET_ALL_ORDERS_REQUEST:
    case UPDATE_ORDER_STATUS_REQUEST:
    case GET_ANALYTIC_REQUEST:
    case GET_ALL_PERMISSION_REQUEST:
    case GET_ALL_ROLE_REQUEST:
    case CREATE_ROLE_REQUEST:
    case DELETE_ROLE_REQUEST:
    case GET_ORDER_BY_ID_REQUEST:
    case DELETE_ROLE_SUCCESS:
    case GET_ALL_PRODUCT_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_SINGLE_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        UserRole: action.payload,
      };
    case GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        products: action.payload,
      };
    case GET_ALL_COUPCON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        coupcons: action.payload,
      };
    case CREATE_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        newRole: action.payload,
      };
    case GET_ALL_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        roles: action.payload,
      };

    case GET_ALL_PERMISSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        permission: action.payload,
      };
    case GET_ANALYTIC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        analytic: action.payload,
      };
    case GET_ALL_BRAND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        brands: action.payload,
      };
    case ADD_BRAND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        brand: action.payload,
      };
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        orderData: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
    case CHANGE_ACCOUNT_STATUS_SUCCESS:
    case EDIT_ACCOUNT_SUCCESS:
    case REMOVE_ACCOUNT_SUCCESS:
    case CREATE_SUB_ADMIN_ACCOUNT_SUCCESS:
    case DELETE_COUPCON_SUCCESS:
    case UPDATE_COUPCON_SUCCESS:
    case UPDATE_CATEGORY_SUCCESS:
    case UPDATE_ORDER_STATUS_SUCCESS:
    case DELETE_BRAND_SUCCESS:
    case UPDATE_BRAND_SUCCESS:
    case CHANGE_ROLE_SUCCESS:
    case UPDATE_PRODUCT_SUCCESS:
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        orders: action.payload,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        allUser: action.payload,
      };
    case GET_SINGLE_ROLE_FAILURE:
    case RESET_PASSWORD_FAILURE:
    case CHANGE_ACCOUNT_STATUS_FAILURE:
    case REMOVE_ACCOUNT_FAILURE:
    case EDIT_ACCOUNT_FAILURE:
    case DELETE_COUPCON_FAILURE:
    case UPDATE_COUPCON_FAILURE:
    case GET_ALL_COUPCON_FAILURE:
    case UPDATE_CATEGORY_FAILURE:
    case GET_ALL_ORDERS_FAILURE:
    case UPDATE_PRODUCT_FAILURE:
    case UPDATE_BRAND_FAILURE:
    case CHANGE_ROLE_FAILURE:
    case GET_ALL_BRAND_FAILURE:
    case DELETE_BRAND_FAILURE:
    case DELETE_PRODUCT_FAILURE:
    case UPDATE_ORDER_STATUS_FAILURE:
    case ADD_BRAND_FAILURE:
    case GET_ALL_USER_FAILURE:
    case GET_ANALYTIC_FAILURE:
    case GET_ALL_PERMISSION_FAILURE:
    case GET_ALL_ROLE_FAILURE:
    case CREATE_ROLE_FAILURE:
    case DELETE_ROLE_FAILURE:
    case CREATE_SUB_ADMIN_ACCOUNT_FAILURE:
    case GET_ALL_PRODUCT_FAILURE:
    case GET_ORDER_BY_ID_FAILURE:
    return { ...state, isLoading: false, error: action.payload };
    // case LOGOUT:
    //   return { ...initialState, jwt: "" };

    default:
      return state;
  }
};
