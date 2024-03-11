import React, { FC, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Divider, Modal, message, Popconfirm, Space, Tag } from 'antd';
import { EditOutlined, ExclamationCircleOutlined, LineChartOutlined, StarOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './QuestionCard.module.scss'
import { useRequest } from "ahooks";
import { duplicateQuestionService, updateQuestionService } from "../services/question";

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const { confirm } = Modal

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(async () => {
    await updateQuestionService(_id, {
      isStar: !isStar
    })
  }, {
    manual: true,
    onSuccess() {
      setIsStarState(!isStarState)
    }
  })

  const nav = useNavigate()

  // function duplicate() {
  //   message.info('duplicate')
  // }
  const { loading: duplicateLoading, run: duplicate } = useRequest(async () => {
    const data = await duplicateQuestionService(_id)
    return data
  }, {
    manual: true,
    onSuccess(res) {
      message.success('复制成功')
      nav(`/question/edit/${res.id}`)
    }
  })

  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(async () => {
    const data = await updateQuestionService(_id, { isDelete: true })
    return data
  }, {
    manual: true,
    onSuccess() {
      message.success('删除成功')
      setIsDeletedState(true)
    }
  })

  function del() {
    confirm({
      title: '确定删除该问卷?',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion
    })
  }

  if (isDeletedState) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStar && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷: {answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button icon={<EditOutlined />} type="text" size="small" onClick={() => nav(`/question/edit/${_id}`)}>编辑问卷</Button>
            <Button icon={<LineChartOutlined />} type="text" size="small" onClick={() => nav(`/question/stat/${_id}`)} disabled={!isPublished}>数据统计</Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button icon={<StarOutlined />} size="small" type="text" onClick={changeStar} disabled={changeStarLoading}>
              {isStarState ? '取消标星' : '星标'}
            </Button>
            <Popconfirm
              title="确定复制该问卷?"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button icon={<CopyOutlined />} size="small" type="text" disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button icon={<DeleteOutlined />} size="small" type="text" onClick={del} disabled={deleteLoading}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard