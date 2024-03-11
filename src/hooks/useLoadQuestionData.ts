import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getQuestionService } from '../services/question';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetComponents } from '../store/componentsReducer';
import { resetPageInfo } from '../store/pageInfoReducer';

function useLoadQuestionData() {
  const { id = '' } = useParams();
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  // const [questionData, setQuestionData] = useState({});
  // const nav = useNavigate();

  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestionService(id);
  //     setQuestionData(data);
  //     setLoading(false);
  //   }

  //   fn().catch(e => {
  //     nav('/404');
  //   });
  // }, []);

  // return {
  //   loading,
  //   questionData
  // };

  // async function load() {
  //   const data = await getQuestionService(id);
  //   return data;
  // }
  const { loading, data, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id');
      const data = await getQuestionService(id);
      return data;
    },
    { manual: true }
  );

  useEffect(() => {
    run(id);
  }, [id]);

  useEffect(() => {
    if (!data) return;
    const {
      title = '',
      desc = '',
      js = '',
      css = '',
      isPublished = false,
      componentList = []
    } = data;
    let selectedId = '';
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }
    dispatch(
      resetComponents({ componentList, selectedId, copiedComponent: null })
    );
    dispatch(resetPageInfo({ title, js, css, desc, isPublished }));
  }, [data]);

  return { loading, error };
}

export default useLoadQuestionData;
