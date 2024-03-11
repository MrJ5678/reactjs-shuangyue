import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Input } from 'antd';
import { LIST_SEARCH_PARAM_KEY } from '../constant';

const { Search } = Input

const ListSearch: FC = () => {
  const [value, setValue] = useState('')
  const nav = useNavigate()
  const { pathname } = useLocation()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])

  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`
    })
  }

  return <div>
    <Search size="large" allowClear placeholder={"请输入关键字"} value={value} onChange={handleChange} onSearch={handleSearch} style={{ width: '200px' }} />
  </div>
}

export default ListSearch