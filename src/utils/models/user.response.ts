import { ProfileState } from "redux/user/models";

export interface UserResponse {
  success: boolean;
  user: ProfileState;
}
