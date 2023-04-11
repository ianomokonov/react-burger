import { DispatchType } from "redux/store";
import {
  setProfileInfo,
  setResetEmail,
  setUserErrorMessage,
} from "./user.slice";
import {
  createUser,
  getUser,
  login,
  logout,
  resetPassword,
  resetPasswordWithCode,
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

export const updateUserThunk = (
  userData: UpdateUserRequest,
  callback?: () => void
) => {
  return async (dispatch: DispatchType) => {
    try {
      const user = await updateUser(userData);
      dispatch(setProfileInfo(user));
      callback && callback();
    } catch (error: any) {
      dispatch(setUserErrorMessage(error.message as string));
      console.error(error);
    }
  };
};

export const loginThunk = (loginData: LoginRequest, callback: () => void) => {
  return async (dispatch: DispatchType) => {
    try {
      const user = await login(loginData);
      dispatch(setProfileInfo(user));
      callback();
    } catch (error: any) {
      dispatch(setUserErrorMessage(error.message as string));
      console.error(error);
    }
  };
};

export const createUserThunk = (createUserData: CreateUserRequest, callback: () => void) => {
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

export const logoutThunk = (callback: () => void) => {
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

export const getResetCodeThunk = (email: string, callback: () => void) => {
  return async (dispatch: DispatchType) => {
    try {
      await resetPassword(email);
      dispatch(setResetEmail(email));
    } catch (error: any) {
      dispatch(setUserErrorMessage(error.message as string));
      console.error(error);
    }
  };
};

export const resetPasswordThunk = (password: string, token: string, callback: () => void) => {
  return async (dispatch: DispatchType) => {
    try {
      await resetPasswordWithCode(token, password);
      dispatch(setResetEmail(null));
    } catch (error: any) {
      dispatch(setUserErrorMessage(error.message as string));
      console.error(error);
    }
  };
};
