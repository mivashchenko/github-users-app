import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import type { RootState } from '../../index';
import request, { ERequestStatus } from '../../../common/request';
import { UserListItem } from '../../../types/user';

export interface IUserState {
  data: UserListItem;
  status: ERequestStatus;
}

const initialState: IUserState = {
  data: {} as UserListItem,
  status: ERequestStatus.IDLE,
};

export const fetchUser = createAsyncThunk('user/fetch', async (userName: string) =>
  request.get<UserListItem>(`https://api.github.com/users/${userName}`),
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = ERequestStatus.LOADING;
      })
      .addCase(fetchUser.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = ERequestStatus.FAILED;
        message.error(`User fetching error!`);
      });
  },
});

export const selectUser = (state: RootState): UserListItem => state.user.data;

export default userSlice.reducer;
