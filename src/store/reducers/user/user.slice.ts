import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../../types/redux/user.type';
import userData from '../../initialState';

const UserSlice = createSlice({
  name: 'UserSlice',
  initialState: userData,
  reducers: {
    getUser: (state) => {
      return state;
    },
    setUser: (state, { payload }: PayloadAction<UserType>) => {
      return state.concat(payload);
    }
  }
});
export const { getUser, setUser } = UserSlice.actions;
export default UserSlice.reducer;