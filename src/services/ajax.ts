import axios from 'axios';
import { message } from 'antd';
import { getToken } from '../utils/user-token';

const instance = axios.create({
  timeout: 10 * 1000
});

instance.interceptors.request.use(
  config => {
    const token = getToken();
    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(res => {
  const resData = res.data || ({} as ResType);
  const { errno, data, msg } = resData;

  if (errno !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg);
    }

    throw new Error(msg);
  }
  return data as any;
});

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
