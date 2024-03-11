import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { MANAGE_INDEX_PATHNAME } from '../router';
import styles from './Home.module.scss';

// import axios from 'axios';
// import '../_mock'

const { Title, Paragraph } = Typography
const Home: FC = () => {
  const nav = useNavigate()

  // useEffect(() => {
  //   // fetch('/api/test')
  //   //   .then(res => res.json())
  //   //   .then(data => {
  //   //     console.log(data);
  //   //   })
  //   axios.get('/api/test')
  //     .then((res: any) => {
  //       console.log(res.data);
  //     })
  // }, [])
  // useEffect(() => {
  //   fetch('/api/test')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //     })
  // }, [])
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查</Title>
        <Paragraph>已累计统计问卷调查 100 份, 发布问卷 90 份, 收到答卷 980 份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>开始使用</Button>
        </div>
      </div>
    </div>
  )
}

export default Home