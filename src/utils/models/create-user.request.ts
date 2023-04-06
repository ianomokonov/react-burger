import { LoginRequest } from "./login.request";

export interface CreateUserRequest extends LoginRequest {
  name: string;
}
