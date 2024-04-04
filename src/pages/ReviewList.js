import './ReviewList.scss';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ReviewList() {
  // const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const location = useLocation();
  // setToken(location.state.token);
  const token = location.state.token;
  // console.log(location.state.token);

  useEffect(() => {
    const getData = async () => {
      try {
        // axiosでレビュー一覧をGETする
        const responseReview = await axios.get(
          'https://railway.bookreview.techtrain.dev/books',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              offset: 10,
            },
          }
        );
        console.log(responseReview.data);
        setReviewList(responseReview.data);
      } catch (error) {
        console.log(error);
        console.log('エラー');
        setErrorMessage(
          `データ取得に失敗しました。 ${error.response.data.ErrorMessageJP}`
        );
      }
    };
    getData();
  }, []);

  return (
    <div className="review-list">
      <h2 className="title">書籍レビュー一覧</h2>
      <div className="error-message --alert">{errorMessage}</div>
      {reviewList.map((review) => {
        return (
          <div key={review.id} className="review">
            <div className="review__title --large">{review.title}</div>
            <div className="review__url --small">
              URL:{' '}
              <a href={review.url} target="_blank" rel="noopener noreferrer">
                {review.url}
              </a>
            </div>
            <div className="review__reviewer">
              レビュワー: {review.reviewer}
            </div>
            <div className="review__detail">{review.detail}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ReviewList;
