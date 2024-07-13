import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  FORGOT_PASSWORD_WITH_EMAIL_FAILURE,
  FORGOT_PASSWORD_WITH_EMAIL_REQUEST,
  FORGOT_PASSWORD_WITH_EMAIL_SUCCESS
} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  log: null
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_WITH_EMAIL_REQUEST:
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, error: null, user: action.payload };
    case FORGOT_PASSWORD_WITH_EMAIL_SUCCESS:
      return { ...state, isLoading: false, error: null, log: action.payload };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case FORGOT_PASSWORD_WITH_EMAIL_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case LOGOUT:
      return { ...initialState, jwt: "" };
    default:
      return state;
  }
};
