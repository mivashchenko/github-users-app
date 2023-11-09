import React, { FunctionComponent, Suspense } from 'react';
import { Spin } from 'antd';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './HomePage';
import { UserDetailsPage } from './UserDetails/UserDetailsPage';

const Router: FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route
      path="user-details/:userName"
      element={
        <Suspense fallback={<Spin />}>
          <UserDetailsPage />
        </Suspense>
      }
    />
  </Routes>
);

export default Router;
