import { UserType } from '../types/redux/user.type';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { userCartProductsType } from '../types/redux/userSelectedProductList.type';

export interface RootReduxState {
  UserSlice: UserType[];
  userSelectedProductListSlice: userCartProductsType
}
export type AppDispatch = ThunkDispatch<RootReduxState, unknown, Action<string>>;