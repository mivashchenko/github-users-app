import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { List, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import {
  fetchUserFollowers,
  selectUserFollowers,
} from '../../../../../store/slices/user/userFollowers.slice';

const { Title } = Typography;

export const UserDetailsFollowers = () => {
  const { userName } = useParams();
  const dispatch = useAppDispatch();
  const userFollowers = useAppSelector(selectUserFollowers);
  useEffect(() => {
    if (!userName) {
      return;
    }
    dispatch(fetchUserFollowers(userName));
  }, [userName, dispatch]);

  const firstFiveFollowers = userFollowers.slice(0, 5);

  return (
    <div className="user-details-followers">
      <Title level={4}>User Followers</Title>
      <List
        className="user-details-organizations__list-container"
        itemLayout="horizontal"
        dataSource={firstFiveFollowers}
        renderItem={(userFollower) => <List.Item>{userFollower.login}</List.Item>}
      />
    </div>
  );
};
