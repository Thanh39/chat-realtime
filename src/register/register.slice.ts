import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';

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
export const registerSlice = createSlice({
  name: 'register',
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
  registerSlice.actions;

export const showPasswordSelector = (state: RootState) => state.register.showPassword;
export const emailSelector = (state: RootState) => state.register.email;
export const isExpiredSelector = (state: RootState) => state.register.isExpired;


export default registerSlice.reducer;
