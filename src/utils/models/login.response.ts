import { ProfileState } from "redux/user/models";
import { TokenResponse } from "./token.response";

export interface LoginResponse extends TokenResponse {
  user: ProfileState;
}
