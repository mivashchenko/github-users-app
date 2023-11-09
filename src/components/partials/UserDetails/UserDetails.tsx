import React from 'react';
import { UserDetailsRepos } from './components/UserDetailsRepos';
import { UserDetailsOrganizations } from './components/UserDetailsOrganizations';
import { UserDetailsFollowers } from './components/UserDetailsFollowers';
import { UserDetailsUser } from './components/UserDetailsUser';

export const UserDetails = () => (
  <div className="user-details">
    <UserDetailsUser />

    <UserDetailsRepos />

    <UserDetailsOrganizations />

    <UserDetailsFollowers />
  </div>
);
