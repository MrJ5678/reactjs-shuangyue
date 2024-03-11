import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { registerService } from '../services/user';
import { Button, Form, Input, Typography, Space, message } from 'antd';
import { UserAddOutlined, } from '@ant-design/icons';
import styles from './Register.module.scss';
import { LOGIN_PATHNAME } from '../router';

const { Title } = Typography

const Register: FC = () => {
  const nav = useNavigate()
  const { run } = useRequest(async (values) => {
    const { username, password, nickname } = values
    const data = await registerService(username, password, nickname)
    return data
  }, {
    manual: true,
    onSuccess() {
      message.success('注册成功')
      nav(LOGIN_PATHNAME)
    }
  })
  function onFinish(values: any) {
    run(values)
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}><UserAddOutlined /></Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名'
              },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: '字符长度在 5 ～ 20 之间'
              },
              {
                pattern: /^\w+$/,
                message: '只能是字母数字下划线'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: '请输入密码'
              },
              ({ getFieldValue }: any): any => ({
                validator(_: any, value: any): any {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('两次密码不一致'))
                  }
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">注册</Button>
              <Link to={LOGIN_PATHNAME}>已有账户, 去登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register