import { combineReducers } from 'redux';
import { RootReduxState } from '../store/redux.type';
import UserSlice from './reducers/user/user.slice';
import userSelectedProductListSlice from './reducers/userSelectedProductList/userSelectedProductList.slice';

const rootReducer = combineReducers<RootReduxState>({
  UserSlice,
  userSelectedProductListSlice
});
export default rootReducer;