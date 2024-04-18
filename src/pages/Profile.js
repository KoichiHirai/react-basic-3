import './Profile.scss';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [userName, setUserName] = useState('');
  const [cookies] = useCookies(['authToken']);

  const handleNameChange = (e) => setUserName(e.target.value);

  const handleUpdate = async () => {
    const userData = {
      name: userName,
    };

    try {
      const responseUserData = await axios.put(
        'https://railway.bookreview.techtrain.dev/users',
        userData,
        {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        }
      );
      // console.log(responseUserData.data.name);
      setUserName(responseUserData.data.name);
    } catch (err) {
      console.log(err);
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
      // console.log(responseUserData.data.name);
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
      {/* <Header /> */}
      <form className="profile">
        <h2>プロフィール画面</h2>
        <label htmlFor="name" className="profile__label">
          名前
        </label>
        <input
          id="name"
          type="text"
          className="profile__input"
          onChange={handleNameChange}
          value={userName}
        />
        <button
          type="button"
          className="profile__button"
          onClick={handleUpdate}
        >
          更新
        </button>
        <Link className="profile__link" to="/">
          ホームに戻る
        </Link>
      </form>
    </>
  );
}

export default Profile;
