import React, { FC, useState } from 'react';
import { useRequest, useTitle } from 'ahooks';
import { Button, Empty, Modal, Space, Spin, Table, Tag, Typography, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPage from '../../components/ListPage';
import { deleteQuestionsService, updateQuestionService } from '../../services/question';
import styles from './Common.module.scss';

// const rawQuestionList = [
//   { _id: 'q1', title: '问卷1', isPublished: false, isStar: true, answerCount: 5, createdAt: '3月10日 12:00' },
//   { _id: 'q2', title: '问卷2', isPublished: false, isStar: false, answerCount: 10, createdAt: '2月1日 12:20' },
//   { _id: 'q3', title: '问卷3', isPublished: true, isStar: false, answerCount: 15, createdAt: '2月10日 22:00' }
// ]

const { confirm } = Modal

const { Title } = Typography

const Trash: FC = () => {
  useTitle('问卷 - 回收站')
  // const [questionList] = useState(rawQuestionList)
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDelete: true })
  const { list = [], total = 0 } = data
  // 记录选中的 id
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 恢复
  const { loading: recoverLoading, run: recover } = useRequest(async () => {
    for await (const id of selectedIds) {
      await updateQuestionService(id, { isDelete: false })
    }
  }, {
    manual: true,
    onSuccess() {
      message.success('恢复成功')
      refresh() // 刷新列表
    }
  })

  const { run: deleteQuestion } = useRequest(async () => await deleteQuestionsService(selectedIds), {
    manual: true,
    onSuccess() {
      message.success('删除成功')
      refresh()
    }
  }
  )

  function del() {
    confirm({
      title: '确认彻底删除该问卷?',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: deleteQuestion
    })
  }

  const tableColumns = [{
    title: '标题',
    dataIndex: 'title',
  }, {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
    }
  }, {
    title: '答卷',
    dataIndex: 'answerCount'
  }, {
    title: '创建时间',
    dataIndex: 'createdAt'
  }]

  const TableElem = <>
    <div style={{ marginBottom: '16px' }}>
      <Space>
        <Button type="primary" disabled={selectedIds.length === 0 || recoverLoading} onClick={recover}>恢复</Button>
        <Button danger disabled={selectedIds.length === 0} onClick={del}>彻底删除</Button>
      </Space>
    </div>
    <Table
      dataSource={list}
      columns={tableColumns}
      rowKey={(q) => q._id}
      pagination={false}
      rowSelection={{
        type: 'checkbox',
        onChange: (selectedRowKeys: any[]) => {
          console.log('selectedRowKeys :', selectedRowKeys);
          setSelectedIds(selectedRowKeys)
        }
      }}
    />
  </>

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>}
        {(!loading && list.length) === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash