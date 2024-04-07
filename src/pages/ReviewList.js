import './ReviewList.scss';
import Pagination from '../components/Pagination';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const location = useLocation();
  // setToken(location.state.token);
  const token = location.state.token;
  // console.log(location.state.token);

  const getData = async (offset) => {
    try {
      // axiosでレビュー一覧をGETする
      const responseReview = await axios.get(
        'https://railway.bookreview.techtrain.dev/books',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            offset: offset,
          },
        }
      );
      console.log(responseReview.data);
      dispatch(setData(responseReview.data));
    } catch (error) {
      console.log(error);
      console.log('エラー');
      setErrorMessage(
        `データ取得に失敗しました。 ${error.response.data.ErrorMessageJP}`
      );
    }
  };

  useEffect(() => {
    getData(currentPage * itemsPerPage);
  }, [currentPage]);

  return (
    <div className="review-list">
      <h2 className="title">書籍レビュー一覧</h2>
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
  );
}

export default ReviewList;
