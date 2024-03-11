import React, { FC, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from '../constant';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
  const [searchParams] = useSearchParams()

  // 从 url 参数中找到 page pageSize 并且同步到组件中
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
    setCurrent(page)
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;
    setPageSize(pageSize)
  }, [searchParams])

  // 当 page 和 pageSize 改变时, 跳转页面
  const nav = useNavigate()
  const { pathname } = useLocation()
  function handlePageChange(page: number, pageSize: number) {
    // console.log(page, pageSize);
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString()
    })
  }

  return <div>
    <Pagination
      defaultCurrent={1}
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handlePageChange}
    />
  </div>
}

export default ListPage