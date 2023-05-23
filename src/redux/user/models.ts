import { FeedOrder } from "redux/feed/models";

export interface UserState {
  profile?: ProfileState | null;
  errorMessage?: string | null;
  resetEmail?: string | null;
  orders: FeedOrder[];
}

export interface ProfileState {
  name: string;
  email: string;
}
