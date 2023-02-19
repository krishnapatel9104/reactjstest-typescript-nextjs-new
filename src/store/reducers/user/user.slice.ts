import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../../types/redux/user.type';

const initialState: UserType = {
  id: 0,
  username: '',
  password: 0
}
const UserSlice = createSlice({
  name: 'UserSlice',
  initialState: initialState,
  reducers: {
    getUser: (state) => {
      return state;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        password: action.payload.password
      };
    }
  }
});
export const { getUser, setUser } = UserSlice.actions;
export default UserSlice.reducer;