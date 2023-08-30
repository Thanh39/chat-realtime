import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';

type StateProps = {
  currentUser:any,
  chats:any[],
  reload:boolean,
  users:any[],
  open:boolean,
  userModal:any,
};
const initialState: StateProps = {
  currentUser:{},
  chats:[],
  reload:false,
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
    setReload:(state, action) => {
      state.reload = action.payload;
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

export const { setCurrentUser,setChats,setReload,setUserListOnline,setOpen,setUserModal, } =
  userInfoSlice.actions;


export default userInfoSlice.reducer;
