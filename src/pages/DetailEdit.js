import './DetailEdit.scss';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function DetailEdit() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [detail, setDetail] = useState('');
  const [review, setReview] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies] = useCookies(['authToken']);
  const navigate = useNavigate();
  const params = useParams();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);
  const handleDetailUpdate = async () => {
    const updateData = {
      title: title,
      url: url,
      detail: detail,
      review: review,
    };

    try {
      await axios.put(
        `https://railway.bookreview.techtrain.dev/books/${params.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      );
      navigate('/');
    } catch (err) {
      console.log(err);
      setErrorMessage(
        `登録に失敗しました。${err.response.data.ErrorMessageJP}`
      );
    }
  };
  const handleDetailDelete = async () => {
    try {
      await axios.delete(
        `https://railway.bookreview.techtrain.dev/books/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      );
      navigate('/');
    } catch (err) {
      console.log(err);
      setErrorMessage(
        `削除に失敗しました。${err.response.data.ErrorMessageJP}`
      );
    }
  };

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
      console.log(responseReviewData.data);
      setTitle(responseReviewData.data.title);
      setUrl(responseReviewData.data.url);
      setDetail(responseReviewData.data.detail);
      setReview(responseReviewData.data.review);
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
      <form className="detail-edit">
        <h2 className="detail-edit__title">書籍レビュー編集</h2>
        <p className="detail-edit__error">{errorMessage}</p>
        <label className="detail-edit__label" htmlFor="title">
          書籍名
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <label className="detail-edit__label" htmlFor="url">
          URL
        </label>
        <input id="url" type="url" value={url} onChange={handleUrlChange} />
        <label className="detail-edit__label" htmlFor="detail">
          書籍内容
        </label>
        <textarea id="detail" value={detail} onChange={handleDetailChange} />
        <label className="detail-edit__label" htmlFor="review">
          レビュー内容
        </label>
        <textarea id="review" value={review} onChange={handleReviewChange} />
        <button
          type="button"
          className="detail-edit__update-button"
          onClick={handleDetailUpdate}
        >
          更新
        </button>
        <button
          type="button"
          className="detail-edit__delete-button"
          onClick={handleDetailDelete}
        >
          削除
        </button>
        <Link className="detail-edit__link" to="/">
          ホームに戻る
        </Link>
      </form>
    </>
  );
}

export default DetailEdit;
