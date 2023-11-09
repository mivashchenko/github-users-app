import React, { useEffect } from 'react';
import VirtualList from 'rc-virtual-list';
import { Avatar, List } from 'antd';
import { Link } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchUsers, fetchUsersMore, selectUsers } from '../../../../store/slices/user/users.slice';
import { UserListItem } from '../../../../types/user';

const CONTAINER_HEIGHT = 500;
export const UserList = () => {
  const users = useAppSelector(selectUsers, shallowEqual);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const onScroll = async (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === CONTAINER_HEIGHT) {
      const params = {
        since: users[users.length - 1].id,
        per_page: 30,
      };
      await dispatch(fetchUsersMore(params));
    }
  };

  return (
    <List>
      <VirtualList
        data={users}
        height={CONTAINER_HEIGHT}
        itemHeight={50}
        itemKey="login"
        onScroll={onScroll}
      >
        {(user: UserListItem) => (
          <List.Item key={user.login}>
            <List.Item.Meta
              avatar={<Avatar src={`${user.avatar_url}`} />}
              title={<Link to={`user-details/${user.login}`}>{user.login}</Link>}
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
