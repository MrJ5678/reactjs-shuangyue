import React, { FC } from 'react';
import { QuestionCheckBoxDefaultProp, QuestionCheckBoxPropsType } from './interface';
import { Checkbox, Space, Typography } from 'antd';

const { Paragraph } = Typography

const Component: FC<QuestionCheckBoxPropsType> = (props: QuestionCheckBoxPropsType) => {
  const { title, isVertical, list = [] } = { ...QuestionCheckBoxDefaultProp, ...props }

  return <div>
    <Paragraph strong>{title}</Paragraph>
    <Space direction={isVertical ? 'vertical' : 'horizontal'}>
      {
        list.map(opt => {
          const { value, text, checked } = opt

          return <Checkbox key={value} value={value} checked={checked}>{text}</Checkbox>
        })
      }
    </Space>
  </div>
}

export default Component