import './Header.scss';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const [user, setUser] = useState(null);
  const [logoutFlag, setLogoutFlag] = useState(false);
  const [cookies, removeCookie] = useCookies(['authToken']);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('ログアウト');
    removeCookie('authToken');
    setLogoutFlag(true);
  };

  const getUserData = async () => {
    if (cookies.authToken) {
      try {
        const responseUserData = await axios.get(
          'https://railway.bookreview.techtrain.dev/users',
          {
            headers: {
              Authorization: `Bearer ${cookies.authToken}`,
            },
          }
        );
        setUser(responseUserData.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (logoutFlag === true) {
      setLogoutFlag(false);
      navigate('/login');
    }
    getUserData();
  }, [cookies.authToken]);

  return (
    <header className="header">
      {/* <div className="header__name --large">書籍レビュー</div> */}
      <Link className="header__name --large" to="/">
        書籍レビュー
      </Link>
      {!cookies.authToken ? (
        <Link className="header__login" to="/login">
          ログイン
        </Link>
      ) : (
        <>
          <div className="header__usename">{user ? user.name : ''}</div>
          <Link className="header__logout" onClick={handleLogout}>
            ログアウト
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
