import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import loginReducer   from '../login/login.slice';
import registerReducer   from '../register/register.slice';
import userInfoReducer   from '../userInfo/userInfo.slice';

// slices

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['login'],
};

const rootReducer = combineReducers({
  login: loginReducer,
  register:registerReducer,
  userInfo:userInfoReducer,
});

export { rootPersistConfig, rootReducer };
