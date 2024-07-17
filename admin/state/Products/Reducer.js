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

const initialState = {
  products: [],
  product: null,
  // color: [],
  brand: [],
  loading: false,
  error: null,
  favoriteList: [],
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
    case GET_SINGLE_PRODUCTS_REQUEST:
    case GET_ALL_BRAND_REQUEST:
    case GET_ALL_CATEGORY_REQUEST:
      // case GET_CATEGORY_COUNT_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };
    case GET_SINGLE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product:   action.payload,
      };
    case GET_ALL_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        brand: action.payload,
      };
    case GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        category: action.payload,
      };
    case GET_PRODUCTS_FAILURE:
    case GET_SINGLE_PRODUCTS_FAILURE:
    case GET_ALL_CATEGORY_FAILURE:
    case GET_ALL_BRAND_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
