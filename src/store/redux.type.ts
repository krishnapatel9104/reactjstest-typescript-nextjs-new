import { UserType } from '../types/redux/user.type';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { userSelectedProductListType } from '../types/redux/userSelectedProductList.type';

export interface RootReduxState {
  UserSlice: UserType[];
  userSelectedProductListSlice: userSelectedProductListType
}
export type AppDispatch = ThunkDispatch<RootReduxState, unknown, Action<string>>;