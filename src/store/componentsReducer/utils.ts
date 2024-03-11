import { ComponentInfoType, ComponentsStateType } from './index';

/**
 * 获取下一项 id
 * @param fe_id 当前选中项
 * @param componentList 列表
 */
export function getNextSelectedId(
  fe_id: string,
  componentList: Array<ComponentInfoType>
) {
  const visibleComponentList = componentList.filter(c => !c.isHidden);
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id);
  if (index < 0) return '';

  let newSelectedId = '';
  const length = visibleComponentList.length;
  if (length <= 1) {
    newSelectedId = '';
  } else {
    if (index + 1 === length) {
      newSelectedId = visibleComponentList[index - 1].fe_id;
    } else {
      newSelectedId = visibleComponentList[index + 1].fe_id;
    }
  }

  return newSelectedId;
}

export function insertNewComponent(
  draft: ComponentsStateType,
  newComponent: ComponentInfoType
) {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex(c => c.fe_id === selectedId);

  if (index < 0) {
    componentList.push(newComponent);
  } else {
    componentList.splice(index + 1, 0, newComponent);
  }

  draft.selectedId = newComponent.fe_id;
}
