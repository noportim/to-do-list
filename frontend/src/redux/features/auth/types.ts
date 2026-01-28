interface AuthState {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  status: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: window.localStorage.getItem("token"),
  isLoading: false,
  status: null,
};

export interface RegisterUserPayload {
  username: string;
  password: string;
}

export interface AuthError {
  message: string | null;
}

export interface AuthResponse {
  message: string;
  user: any;
  token: string;
}
