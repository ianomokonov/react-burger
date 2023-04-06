import { DispatchType } from "redux/store";
import { setProfileInfo, setUserErrorMessage } from "./user.slice";
import {
  createUser,
  getUser,
  login,
  logout,
  updateUser,
} from "utils/data-access";
import { UpdateUserRequest } from "utils/models/update-user.request";
import { LoginRequest } from "utils/models/login.request";
import { CreateUserRequest } from "utils/models/create-user.request";

export const getUserThunk = () => {
  return async (dispatch: DispatchType) => {
    try {
      const user = await getUser();
      dispatch(setProfileInfo(user));
    } catch (error: any) {
      dispatch(setUserErrorMessage(error.message as string));
      console.error(error);
    }
  };
};

export const updateUserThunk = (userData: UpdateUserRequest) => {
  return async (dispatch: DispatchType) => {
    try {
      const user = await updateUser(userData);
      dispatch(setProfileInfo(user));
    } catch (error: any) {
      dispatch(setUserErrorMessage(error.message as string));
      console.error(error);
    }
  };
};

export const loginThunk = (loginData: LoginRequest) => {
  return async (dispatch: DispatchType) => {
    try {
      const user = await login(loginData);
      dispatch(setProfileInfo(user));
    } catch (error: any) {
      dispatch(setUserErrorMessage(error.message as string));
      console.error(error);
    }
  };
};

export const createUserThunk = (createUserData: CreateUserRequest) => {
  return async (dispatch: DispatchType) => {
    try {
      const user = await createUser(createUserData);
      dispatch(setProfileInfo(user));
    } catch (error: any) {
      dispatch(setUserErrorMessage(error.message as string));
      console.error(error);
    }
  };
};

export const logoutThunk = () => {
  return async (dispatch: DispatchType) => {
    try {
      await logout();
      dispatch(setProfileInfo(null));
    } catch (error: any) {
      dispatch(setUserErrorMessage(error.message as string));
      console.error(error);
    }
  };
};
