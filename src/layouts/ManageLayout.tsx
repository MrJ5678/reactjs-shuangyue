import React, { FC } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button, Divider, Space, message } from 'antd';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './ManageLayout.module.scss';
import { createQuestionService } from '../services/question';
import { useRequest } from 'ahooks';

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  // const [loading, setLoading] = useState(false)

  function getButtonType(buttonClicked: string) {
    return pathname.startsWith(`/manage/${buttonClicked}`) ? 'default' : 'text'
  }

  function navTo(buttonClicked: string): any {
    nav(`/manage/${buttonClicked}`)
  }

  // async function handleCreateClick() {
  //   setLoading(true)
  //   const data = await createQuestionService()
  //   const { id } = data || {}
  //   if (id) {
  //     nav(`/question/edit/${id}`)
  //     message.success('创建成功')
  //   }
  //   setLoading(false)
  // }
  const { loading, run: handleCreateClick } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`)
      message.success('创建成功')
    },
    onError() {
      nav('/404')
    }
  })

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button type="primary" size="large" icon={<PlusOutlined />} onClick={handleCreateClick} disabled={loading}>新建问卷</Button>
          <Divider />
          <Button type={getButtonType('list')} size="large" icon={<BarsOutlined />} onClick={() => navTo('list')}>我的问卷</Button>
          <Button type={getButtonType('star')} size="large" icon={<StarOutlined />} onClick={() => navTo('star')}>星标问卷</Button>
          <Button type={getButtonType('trash')} size="large" icon={<DeleteOutlined />} onClick={() => navTo('trash')}>回收站</Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout