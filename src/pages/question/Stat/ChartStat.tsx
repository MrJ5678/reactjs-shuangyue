import { useRequest } from 'ahooks';
import { Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { getComponentStatService } from '../../../services/stat';
import { useParams } from 'react-router-dom';
import { getComponentConfByType } from '../../../components/QuestionComponents';

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const { Title } = Typography

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props
  const { id = '' } = useParams()
  const [stat, setStat] = useState([])
  const { run } = useRequest(async (questionId, selectedComponentId) => await getComponentStatService(questionId, selectedComponentId), {
    manual: true, onSuccess(res) {
      setStat(res.stat)
    }
  })

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
  }, [id, selectedComponentId])

  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>
    const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
    if (!StatComponent) return <div>该组件无统计图表</div>
    return <StatComponent stat={stat} />
  }

  return <>
    <Title level={3}>图标统计</Title>
    <div>{genStatElem()}</div>
  </>
}

export default ChartStat