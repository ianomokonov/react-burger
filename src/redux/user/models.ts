export interface UserState {
  profile?: ProfileState | null;
  errorMessage?: string | null;
  resetEmail?: string | null;
}

export interface ProfileState {
  name: string;
  email: string;
}
