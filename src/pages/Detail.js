import './Detail.scss';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Detail() {
  const [reviewData, setReviewData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies] = useCookies(['authToken']);
  const params = useParams();

  const getReviewData = async () => {
    try {
      const responseReviewData = await axios.get(
        `https://railway.bookreview.techtrain.dev/books/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      );
      setReviewData(responseReviewData.data);
    } catch (err) {
      console.log(err);
      setErrorMessage(
        `データ取得に失敗しました。${err.response.data.ErrorMessageJP}`
      );
    }
  };

  useEffect(() => {
    getReviewData();
  }, []);

  return (
    <>
      <Header />
      <div className="detail">
        <h2 className="detail__title">書籍レビュー詳細</h2>
        <p className="detail__error">{errorMessage}</p>
        {reviewData === null ? (
          <div className="detail__loading --bold">ローディング中</div>
        ) : (
          <>
            <label className="detail__label">書籍名</label>
            <div className="detail__book-title">{reviewData.title}</div>
            <label className="detail__label">URL</label>
            <div className="detail__url">{reviewData.url}</div>
            <label className="detail__label">書籍内容</label>
            <div className="detail__detail">{reviewData.detail}</div>
            <label className="detail__label">レビュー内容</label>
            <div className="detail__review">{reviewData.review}</div>
            <label className="detail__label">レビュワー</label>
            <div className="detail__reviewer">{reviewData.reviewer}</div>
            <Link className="detail__link" to="/">
              ホームに戻る
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Detail;
