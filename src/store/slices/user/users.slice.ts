import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { message } from 'antd';
import type { RootState } from '../../index';
import request, { ERequestStatus } from '../../../common/request';
import { UserListItem } from '../../../types/user';

export interface IUserState {
  data: UserListItem[];
  status: ERequestStatus;
}

const initialState: IUserState = {
  data: [],
  status: ERequestStatus.IDLE,
};

export const fetchUsers = createAsyncThunk('users/fetch', async () =>
  request.get<UserListItem[]>('https://api.github.com/users'),
);

export const fetchUsersMore = createAsyncThunk(
  'usersMore/fetch',
  async (params?: { since: number; per_page: number }) =>
    request.get<UserListItem[]>(
      `https://api.github.com/users?since=${params?.since || 0}&per_page=${params?.per_page || 30}`,
    ),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchUsers builder
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = ERequestStatus.LOADING;
      })
      .addCase(fetchUsers.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = ERequestStatus.FAILED;
        message.error(`${JSON.stringify(action)}`);
      });

    // fetchUsersMore builder
    builder
      .addCase(fetchUsersMore.pending, (state) => {
        state.status = ERequestStatus.LOADING;
      })
      .addCase(fetchUsersMore.fulfilled, (state, action) => {
        const state1 = state;
        state1.status = ERequestStatus.SUCCEEDED;
        state.data = [...current(state1.data), ...action.payload];
        message.success(`${action.payload?.length} more items loaded!`);
      })
      .addCase(fetchUsersMore.rejected, (state) => {
        state.status = ERequestStatus.FAILED;
        message.error(`More Users fetching error!`);
      });
  },
});

export const selectUsers = (state: RootState): UserListItem[] => state.users.data;

export default usersSlice.reducer;
