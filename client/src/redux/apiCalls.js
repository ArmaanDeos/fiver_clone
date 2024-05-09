import requestMethod from "../utils/requestMethod";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  registerFail,
  registerStart,
  registerSuccess,
} from "./reducers/authSlice";

//* Login API Call
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await requestMethod.post("/auth/login", user);
    console.log(res);
    dispatch(loginSuccess(res.data.user));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

//* Logout API Call
export const logoutUser = async (dispatch) => {
  dispatch(logout());
  // localStorage.setItem("currentUser", null);
};

//* Register API Call
export const registerUser = async (dispatch, newUser) => {
  dispatch(registerStart());
  try {
    const res = await requestMethod.post("/auth/register", newUser);
    console.log(res);
    dispatch(registerSuccess(res.data.user));
  } catch (error) {
    dispatch(registerFail(error.message));
  }
};
