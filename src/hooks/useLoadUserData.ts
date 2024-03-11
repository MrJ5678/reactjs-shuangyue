import { useEffect, useState } from 'react';
import useGetUserInfo from './useGetUserInfo';
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';
import { getUserInfoService } from '../services/user';
import { loginReducer } from '../store/userReducer';
// import { getToken } from '../utils/user-token';
// import { message } from 'antd';

function useLoadUserData() {
  // const { pathname } = useLocation();
  // const nav = useNavigate();
  const dispatch = useDispatch();
  const [waitingUserData, setWaitingUserData] = useState(true);
  const { username } = useGetUserInfo(); // 读 redux 中是否有用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      // 存储到 redux store 中
      dispatch(loginReducer({ username, nickname }));
      // nav('/manage/list');
    },
    onFinally() {
      setWaitingUserData(false);
    }
  });

  useEffect(() => {
    // 没有 token 且 path 为 /login
    // if (pathname === '/login') {
    //   setWaitingUserData(false);
    //   return;
    // }
    //
    // if (username) {
    //   setWaitingUserData(false);
    //   return;
    // }
    // const token = getToken();
    // 有 token 没有 username path 为 /login
    // 1. 获取 username 并 跳转到 /manage/list
    // 有 token 有 username path 为 /login
    // 显示 ”快速进入“
    // 没有 token
    // 跳转到 /login
    // if (token && !username && pathname === '/login') {
    //   run();
    // }
    // if (token && username && pathname === '/login') {
    //   setWaitingUserData(false);
    //   nav('/manage/list');
    // }
    // if (!token) {
    //   setWaitingUserData(false);
    //   nav('/login');
    // }
    // console.log('token:', token);
    // console.log('username:', username);
    // console.log(pathname);
    // if (token && !username && pathname === '/manage/list') {
    //   run();
    // } else if (token && username) {
    //   console.log('token && username ...');
    //   setWaitingUserData(false);
    // } else if (!token) {
    //   setWaitingUserData(false);
    // }
    if (username) {
      setWaitingUserData(false);
      return;
    }

    run();
  }, [username]);

  return { waitingUserData };
}

export default useLoadUserData;
