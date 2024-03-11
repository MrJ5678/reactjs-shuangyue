import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPreComponent
} from '../store/componentsReducer';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

/**
 * 判断是否进入删除组件的状态
 * @returns
 */
function isActiveElementValid() {
  const activeElem = document.activeElement;

  // 光标没有选中 input  元素
  // if (activeElem === document.body) return true;

  if (activeElem === document.body) return true;
  if (activeElem?.matches('div[role="button"]')) return true;
  return false;
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();
  // 删除
  useKeyPress(['backspace', 'delete'], () => {
    if (isActiveElementValid()) {
      dispatch(removeSelectedComponent());
    }
  });

  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (isActiveElementValid()) {
      dispatch(copySelectedComponent());
    }
  });

  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (isActiveElementValid()) {
      dispatch(pasteCopiedComponent());
    }
  });

  // 选中上一个
  useKeyPress('uparrow', () => {
    if (isActiveElementValid()) {
      dispatch(selectPreComponent());
    }
  });

  // 选中下一个
  useKeyPress('downarrow', () => {
    if (isActiveElementValid()) {
      dispatch(selectNextComponent());
    }
  });

  // 撤销/重做
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (isActiveElementValid()) {
        dispatch(UndoActionCreators.undo());
      }
    },
    { exactMatch: true }
  );

  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (isActiveElementValid()) {
      dispatch(UndoActionCreators.redo());
    }
  });
}

export default useBindCanvasKeyPress;
