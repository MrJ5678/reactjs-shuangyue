import React, { FC } from 'react';
import { ComponentConfType, componentConfGroup } from '../../../components/QuestionComponents';
import { Typography } from 'antd';
import styles from './ComponentLib.module.scss';
import { useDispatch } from 'react-redux';
import { addComponent } from '../../../store/componentsReducer';
import { nanoid } from 'nanoid';

const { Title } = Typography


const Lib: FC = () => {
  const dispatch = useDispatch()
  function getComponent(c: ComponentConfType, i: number) {
    const { title, type, Component, defaultProps } = c

    function handleClick() {
      dispatch(addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps
      }))
    }

    return <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component {...defaultProps} />
      </div>
    </div>
  }
  return <>
    {componentConfGroup.map((group, index) => {
      const { groupName, components } = group
      return <div key={index}>
        <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '' }}>{groupName}</Title>
        <div>
          {components.map((c, i) => getComponent(c, i))}
        </div>
      </div>
    })}
  </>
}

export default Lib