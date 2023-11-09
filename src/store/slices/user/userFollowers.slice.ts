import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import type { RootState } from '../../index';
import request, { ERequestStatus } from '../../../common/request';
import { UserFollowers } from '../../../types/user';

export interface IUserState {
  data: UserFollowers[];
  status: ERequestStatus;
}

const initialState: IUserState = {
  data: [],
  status: ERequestStatus.IDLE,
};

export const fetchUserFollowers = createAsyncThunk(
  'userFollowers/fetch',
  async (userName: string) =>
    request.get<UserFollowers[]>(`https://api.github.com/users/${userName}/followers`),
);

export const userFollowers = createSlice({
  name: 'userFollowers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFollowers.pending, (state) => {
        state.status = ERequestStatus.LOADING;
      })
      .addCase(fetchUserFollowers.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchUserFollowers.rejected, (state) => {
        state.status = ERequestStatus.FAILED;
        message.error(`User Followers fetching error!`);
      });
  },
});

export const selectUserFollowers = (state: RootState): UserFollowers[] => state.userFollowers.data;

export default userFollowers.reducer;
