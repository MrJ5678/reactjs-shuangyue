import React, { FC, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { STAT_COLORS } from '../../../constant';
import { QuestionRadioStatPropsType } from './interface';

// const data01 = [
//   {name: 'GroupA', value: 400},
//   {name: 'GroupB', value: 300},
//   {name: 'GroupC', value: 200},
//   {name: 'GroupD', value: 500},
//   {name: 'GroupE', value: 700},
//   {name: 'GroupF', value: 480},
// ]

function format(n: number) {
  return (n * 100).toFixed(2)
}

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
  const sum = useMemo(() => {
    let s = 0
    stat.forEach(i => s += i.count)
    return s
  }, [stat])

  return (
    <div style={{ width: '300px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            label={i => `${i.name}: ${format(i.count / sum)}%`}
          />
        </PieChart>
        {stat.map((i, index) => {
          return <Cell key={index} fill={STAT_COLORS[index]} />
        })}
        <Tooltip />
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent