import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';

type StateProps = {
  currentUser:any,
  chats:any[]
};
const initialState: StateProps = {
  currentUser:{},
  chats:[]
};
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      console.log("check redux nef",action.payload)
      state.currentUser = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    
  },
});

export const { setCurrentUser,setChats } =
  userInfoSlice.actions;


export default userInfoSlice.reducer;
