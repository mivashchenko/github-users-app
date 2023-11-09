import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { fetchUser, selectUser } from '../../../../../store/slices/user/user.slice';
import './style.scss';

export const UserDetailsUser = () => {
  const { userName } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!userName) {
      return;
    }
    dispatch(fetchUser(userName));
  }, [userName, dispatch]);

  return (
    <div className="user-details-user">
      <Avatar
        src={`${user.avatar_url}`}
        alt={user.login}
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
      />
      <p>Name: {user.name}</p>
      <p>Username: {user.login}</p>
      <p>Followers total: {user.followers}</p>
    </div>
  );
};
