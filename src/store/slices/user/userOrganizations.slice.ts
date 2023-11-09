import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import type { RootState } from '../../index';
import request, { ERequestStatus } from '../../../common/request';
import { UserOrganization } from '../../../types/user';

export interface IUserState {
  data: UserOrganization[];
  status: ERequestStatus;
}

const initialState: IUserState = {
  data: [],
  status: ERequestStatus.IDLE,
};

export const fetchUserOrganizations = createAsyncThunk(
  'userOrganizations/fetch',
  async (userName: string) =>
    request.get<UserOrganization[]>(`https://api.github.com/users/${userName}/orgs`),
);

export const userOrganizationsSlice = createSlice({
  name: 'userOrganizations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrganizations.pending, (state) => {
        state.status = ERequestStatus.LOADING;
      })
      .addCase(fetchUserOrganizations.fulfilled, (_state, action) => {
        const state = _state;
        state.status = ERequestStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchUserOrganizations.rejected, (state) => {
        state.status = ERequestStatus.FAILED;
        message.error(`User Organizations fetching error!`);
      });
  },
});

export const selectUserOrganizations = (state: RootState): UserOrganization[] =>
  state.userOrganizations.data;

export default userOrganizationsSlice.reducer;
