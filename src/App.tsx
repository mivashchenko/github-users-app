import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import Router from './routes';

import './styles/vendors.scss';
import './style.scss';

const { Header, Footer, Content } = Layout;

const App = () => (
  <main className="main-container">
    <Layout>
      <Header>
        <Link to="/">Home</Link>
      </Header>
      <Content style={{ padding: '0 50px', margin: '50px' }}>
        <Router />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  </main>
);

export default App;
