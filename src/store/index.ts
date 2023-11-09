import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from './slices/user/users.slice';
import userReducer from './slices/user/user.slice';
import userReposReducer from './slices/user/userRepos.slice';
import userOrganizationsReducer from './slices/user/userOrganizations.slice';
import userFollowersReducer from './slices/user/userFollowers.slice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    userRepos: userReposReducer,
    userOrganizations: userOrganizationsReducer,
    userFollowers: userFollowersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
