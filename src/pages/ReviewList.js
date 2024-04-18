import './ReviewList.scss';
import Pagination from '../components/Pagination';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCurrentPage, setData } from '../actions/action';

function ReviewList() {
  // const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const { currentPage, data } = useSelector((state) => state.pagination);
  // const currentPage = useSelector((state) => state.pagination);
  // const data = useSelector((state) => state.data);
  const [cookies] = useCookies(['authToken']);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // setToken(location.state.token);
  // const token = location.state.token;
  // console.log(location.state.token);

  const getData = async (offset) => {
    try {
      let responseReview;
      // axiosでレビュー一覧をGETする
      if (!cookies.authToken) {
        responseReview = await axios.get(
          'https://railway.bookreview.techtrain.dev/public/books',
          {
            // headers: {
            //   Authorization: `Bearer ${cookies.authToken}`,
            // },
            params: {
              offset: offset,
            },
          }
        );
      } else {
        responseReview = await axios.get(
          'https://railway.bookreview.techtrain.dev/books',
          {
            headers: {
              Authorization: `Bearer ${cookies.authToken}`,
            },
            params: {
              offset: offset,
            },
          }
        );
      }
      dispatch(setData(responseReview.data));
    } catch (error) {
      console.log(error);
      setErrorMessage(
        `データ取得に失敗しました。 ${error.name === 'AxiosError' ? error.response.data : error.response.data.ErrorMessageJP}`
      );
    }
  };

  //一時的にログアウトボタンを実装
  // const handleLogout = () => {
  //   removeCookie('authToken');
  // };

  useEffect(() => {
    getData(currentPage * itemsPerPage);
  }, [currentPage, cookies.authToken]);

  return (
    <>
      <Header />
      <div className="review-list">
        <div className="page-title">
          <h2 className="page-title__title">書籍レビュー一覧</h2>
          <button
            className="page-title__create-button"
            onClick={() => navigate('/new')}
          >
            レビュー登録
          </button>
        </div>
        <div className="error-message --alert">{errorMessage}</div>
        {data.map((review) => {
          return (
            <div key={review.id} className="review">
              <div className="review__title --large">{review.title}</div>
              <div className="review__url --small">
                URL:{' '}
                <Link to={review.url} target="_blank" rel="noopener noreferrer">
                  {review.url}
                </Link>
              </div>
              <div className="review__reviewer">
                レビュワー: {review.reviewer}
              </div>
              <div className="review__detail">{review.detail}</div>
            </div>
          );
        })}
        <Pagination />
        {/* <button onClick={handleLogout} disabled={!cookies.authToken}>
          ログアウト
        </button> */}
        {/* <div className="pagination">
        <button
          className="pagination__button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          前のページ
        </button>
        <span className="pagination__page">{currentPage}</span>
        <button
          className="pagination__button"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          次のページ
        </button>
      </div> */}
      </div>
    </>
  );
}

export default ReviewList;
