import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { List, Typography } from 'antd';

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { fetchUserRepos, selectUserRepos } from '../../../../../store/slices/user/userRepos.slice';
import './style.scss';

const { Title } = Typography;
export const UserDetailsRepos = () => {
  const { userName } = useParams();
  const dispatch = useAppDispatch();
  const userRepos = useAppSelector(selectUserRepos);
  useEffect(() => {
    if (!userName) {
      return;
    }
    dispatch(fetchUserRepos(userName));
  }, [userName, dispatch]);

  return (
    <div className="user-details-repos">
      <Title level={4}>User Repositories</Title>
      <List
        className="user-details-repos__list-container"
        itemLayout="horizontal"
        dataSource={userRepos}
        renderItem={(userRepo) => <List.Item>{userRepo.name}</List.Item>}
      />
    </div>
  );
};
