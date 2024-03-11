import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { getQuestionListService } from '../services/question';
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE
} from './../constant/index';

type OptionType = {
  isStar: boolean;
  isDelete: boolean;
};

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDelete } = opt;
  const [searchParam] = useSearchParams();
  // console.log('keyword', searchParam.get('keyword'));
  // console.log(searchParam);
  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParam.get(LIST_SEARCH_PARAM_KEY) || '';
      const page = parseInt(searchParam.get(LIST_PAGE_PARAM_KEY) || '') || 1;
      const pageSize =
        parseInt(searchParam.get(LIST_PAGE_SIZE_PARAM_KEY) || '') ||
        LIST_PAGE_SIZE;
      const data = await getQuestionListService({
        keyword,
        isStar,
        isDelete,
        page,
        pageSize
      });

      return data;
    },
    {
      refreshDeps: [searchParam]
    }
  );

  return { data, loading, error, refresh };
}

export default useLoadQuestionListData;
