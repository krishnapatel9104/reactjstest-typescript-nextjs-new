import { combineReducers } from 'redux';
import { RootReduxState } from '../store/redux.type';
import UserSlice from './reducers/user/user.slice';

const rootReducer = combineReducers<RootReduxState>({
  UserSlice
});
export default rootReducer;