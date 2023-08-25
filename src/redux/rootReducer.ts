import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import loginReducer   from '../login/login.slice';
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
});

export { rootPersistConfig, rootReducer };
