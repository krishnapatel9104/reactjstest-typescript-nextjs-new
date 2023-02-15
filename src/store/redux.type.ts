import { UserType } from '../types/redux/user.type';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

export interface RootReduxState {
  UserSlice: UserType[];
}
export type AppDispatch = ThunkDispatch<RootReduxState, unknown, Action<string>>;