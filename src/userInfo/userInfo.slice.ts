import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../common/redux/store';

type StateProps = {
  currentUser:any,
  chats:any[],
  users:any[],
  open:boolean,
  userModal:any,
};
const initialState: StateProps = {
  currentUser:{},
  chats:[],
  users:[],
  open:false,
  userModal:{}

};
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setUserListOnline:(state, action) => {
      state.users = action.payload;
    },
    setOpen:(state, action) => {
      state.open = action.payload;
    },
    setUserModal:(state, action) => {
      state.userModal = action.payload;
    }
  },
});

export const { setCurrentUser,setChats,setUserListOnline,setOpen,setUserModal, } =
  userInfoSlice.actions;


export default userInfoSlice.reducer;
