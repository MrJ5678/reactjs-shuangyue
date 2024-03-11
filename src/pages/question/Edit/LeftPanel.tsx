import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import React, { FC } from 'react';
import ComponentLib from './ComponentLib';
import Layer from './Layer';

const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: <ComponentLib />
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <Layer />
    }
  ]

  return <Tabs defaultActiveKey='componentLib' items={tabsItems} />
}

export default LeftPanel