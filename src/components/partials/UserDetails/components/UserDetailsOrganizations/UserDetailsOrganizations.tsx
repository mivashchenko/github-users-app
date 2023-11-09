import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { List, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import {
  fetchUserOrganizations,
  selectUserOrganizations,
} from '../../../../../store/slices/user/userOrganizations.slice';
import './style.scss';

const { Title } = Typography;
export const UserDetailsOrganizations = () => {
  const { userName } = useParams();
  const dispatch = useAppDispatch();
  const userOrganizations = useAppSelector(selectUserOrganizations);
  useEffect(() => {
    if (!userName) {
      return;
    }
    dispatch(fetchUserOrganizations(userName));
  }, [userName, dispatch]);

  return (
    <div className="user-details-organizations">
      <Title level={4}>User Organizations</Title>
      <List
        className="user-details-organizations__list-container"
        itemLayout="horizontal"
        dataSource={userOrganizations}
        renderItem={(userOrganization) => <List.Item>{userOrganization.login}</List.Item>}
      />
    </div>
  );
};
