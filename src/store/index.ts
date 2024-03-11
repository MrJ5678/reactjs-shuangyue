import { configureStore } from '@reduxjs/toolkit';
import undoable, { execludeAction, StateWithHistory } from 'redux-undo';
import userReducer, { UserStateType } from './userReducer';
import componentsReducer, { ComponentsStateType } from './componentsReducer';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';

export type StateType = {
  user: UserStateType;
  components: StateWithHistory<ComponentsStateType>;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    // 分模块
    // 用户信息模块
    user: userReducer,
    // 组件列表模块
    // components: componentsReducer,
    components: undoable(componentsReducer, {
      limit: 10,
      filter: execludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent'
      ])
    }),
    // 问卷信息模块 ...
    pageInfo: pageInfoReducer
  }
});
