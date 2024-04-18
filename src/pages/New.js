import './New.scss';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function New() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [detail, setDetail] = useState('');
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies] = useCookies(['authToken']);
  const navigate = useNavigate();
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleCreate = async () => {
    const createData = {
      title: title,
      url: url,
      detail: detail,
      review: userName,
    };

    try {
      const responseUserData = await axios.post(
        'https://railway.bookreview.techtrain.dev/books',
        createData,
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

  const getUserData = async () => {
    try {
      const responseUserData = await axios.get(
        'https://railway.bookreview.techtrain.dev/users',
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      );
      setUserName(responseUserData.data.name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Header />
      <form className="create">
        <h2 className="create__title">書籍レビュー登録画面</h2>
        <p className="create__error">{errorMessage}</p>
        <label className="create__label" htmlFor="title">
          書籍名
        </label>
        <input id="title" type="text" onChange={handleTitleChange} />
        <label className="create__label" htmlFor="url">
          URL
        </label>
        <input id="url" type="url" onChange={handleUrlChange} />
        <label className="create__label" htmlFor="detail">
          レビュー内容
        </label>
        <textarea id="detail" onChange={handleDetailChange} />
        <button type="button" className="create__button" onClick={handleCreate}>
          登録
        </button>
        <Link className="create__link" to="/">
          ホームに戻る
        </Link>
      </form>
    </>
  );
}

export default New;
