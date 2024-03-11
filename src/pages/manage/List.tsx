import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounceFn, useRequest, useTitle } from 'ahooks';
import { Typography, Spin, Empty } from 'antd';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import { getQuestionListService } from "../../services/question";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";
import styles from './Common.module.scss';
// import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";

const { Title } = Typography

// const rawQuestionList = [
//   { _id: 'q1', title: '问卷1', isPublished: false, isStar: false, answerCount: 5, createdAt: '3月10日 12:00' },
//   { _id: 'q2', title: '问卷2', isPublished: false, isStar: false, answerCount: 10, createdAt: '2月1日 12:20' },
//   { _id: 'q3', title: '问卷3', isPublished: true, isStar: false, answerCount: 15, createdAt: '2月10日 22:00' },
//   { _id: 'q4', title: '问卷4', isPublished: true, isStar: false, answerCount: 35, createdAt: '3月11日 11:00' }
// ]

const List: FC = () => {
  useTitle('问卷-我的问卷')

  // const { loading, data = {} } = useLoadQuestionListData()
  // const { list = {}, total = 0 } = data
  const [started, setStarted] = useState(false)
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length

  const [searchParams] = useSearchParams() // url 参数 没有 page 和 pageSize 有 keyword

  // 触发加载
  // function tryLoadMore() {
  //   console.log('tryLoadMore ... ');
  // }
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  // keyword 变化时重置所有数据
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])
  // 真正加载
  const { run: load, loading } = useRequest(async () => {
    const data = await getQuestionListService({
      page,
      pageSize: LIST_PAGE_SIZE,
      keyword
    })

    return data
  }, {
    manual: true,
    onSuccess(result) {
      const { list: l = [], total = 0 } = result
      setList(list.concat(l)) // list 数据要累积
      setTotal(total)
      setPage(page + 1)
    }
  })
  // 尝试加载
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(() => {
    const elem = containerRef.current
    if (!elem) return
    const domRect = elem.getBoundingClientRect()
    if (domRect === null) return
    const { bottom } = domRect
    if (bottom <= document.body.clientHeight) {
      console.log('执行加载...');
      load()
      setStarted(true)
    }
  }, {
    wait: 1000
  })

  // keyword 变化时触发加载数据
  useEffect(() => {
    tryLoadMore() // 加载第一页
  }, [searchParams])

  // 页面上划时触发加载数据
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  const loadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }, [started, loading, total, haveMoreData])
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {
          list.length > 0 && list.map((q: any) => {
            const { _id } = q
            return (
              <QuestionCard key={_id} {...q} />
            )
          })
        }
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>
          {loadMoreContentElem}
        </div>
      </div>
    </>
  )
}

export default List