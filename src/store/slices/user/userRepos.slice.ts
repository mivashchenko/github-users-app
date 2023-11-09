import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import type { RootState } from '../../index';
import request, { ERequestStatus } from '../../../common/request';
import { UserRepo } from '../../../types/user';

export interface IUserState {
  data: UserRepo[];
  status: ERequestStatus;
}

const initialState: IUserState = {
  data: [],
  status: ERequestStatus.IDLE,
};

export const fetchUserRepos = createAsyncThunk(
  'userRepos/fetch',
  async (userName: string) =>
    request.get<UserRepo[]>(`https://api.github.com/users/${userName}/repos`) || [],
);

export const userReposSlice = createSlice({
  name: 'userRepos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRepos.pending, (state) => {
        state.status = ERequestStatus.LOADING;
      })
      .addCase(fetchUserRepos.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchUserRepos.rejected, (state) => {
        state.status = ERequestStatus.FAILED;
        message.error(`User Repos fetching error!`);
      });
  },
});

export const selectUserRepos = (state: RootState): UserRepo[] => state.userRepos.data;

export default userReposSlice.reducer;
