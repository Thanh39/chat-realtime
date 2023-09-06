import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../common/redux/store';

type StateProps = {
  email: string;
  showPassword: boolean;
  isExpired: boolean;
};
const initialState: StateProps = {
  showPassword: false,
  email: '',
  isExpired: false,
};
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setIsExpired: (state, action) => {
      state.isExpired = action.payload;
    },
    
  },
});

export const { setShowPassword, setEmail, setIsExpired } =
  loginSlice.actions;

export const showPasswordSelector = (state: RootState) => state.login.showPassword;
export const emailSelector = (state: RootState) => state.login.email;
export const isExpiredSelector = (state: RootState) => state.login.isExpired;


export default loginSlice.reducer;
