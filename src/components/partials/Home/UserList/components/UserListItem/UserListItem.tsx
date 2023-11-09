import React from 'react';
import { Avatar, List } from 'antd';
import { UserListItem } from 'types/user';
import './style.scss';
import { Link } from 'react-router-dom';

type UserListItemProps = {
  user: UserListItem;
};

export const UsersListItem = ({ user }: UserListItemProps) => (
  <List.Item key={user.id}>
    <List.Item.Meta
      avatar={<Avatar src={`${user.avatar_url}`} />}
      title={<Link to={`user-details/${user.login}`}>{user.login}</Link>}
    />
  </List.Item>
);
