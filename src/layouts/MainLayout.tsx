import React, { FC } from 'react';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';
import styles from './MainLayout.module.scss';

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {waitingUserData ?
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
            : <Outlet />}
        </Content>
      </Layout>
      <Footer className={styles.footer}>
        react 问卷项目 2024
      </Footer>
    </Layout>
  )
}

export default MainLayout