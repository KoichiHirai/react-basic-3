import './Login.scss';
// import Header from '../components/Header';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [token, setToken] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['authToken']);
  const isValid = !email || emailError || !pwd;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setEmailError('');
    } else {
      setEmailError('正しいメールアドレスを入力してください');
    }
  };
  const handlePwdChange = (e) => setPwd(e.target.value);
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const handleSubmit = async (e) => {
    //ユーザー作成時にPOSTするデータを生成
    const loginData = {
      email: email,
      password: pwd,
    };

    try {
      // axiosでPOSTしてログインする
      const responseLogin = await axios.post(
        'https://railway.bookreview.techtrain.dev/signin',
        loginData
      );
      // setToken(responseLogin.data.token);
      setCookie('authToken', responseLogin.data.token, {
        path: '/',
        sameSite: 'strict',
      });
      //次の画面に遷移する
      // navigate('/', { state: { token: responseLogin.data.token } });
      navigate('/');
    } catch (error) {
      console.log(error);
      setErrorMessage(
        `サインアップに失敗しました。 ${error.response.data.ErrorMessageJP}`
      );
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div className="login">
        <form className="form">
          <h2>ログイン画面</h2>
          <p className="error-message">{errorMessage}</p>
          <label htmlFor="email">メールアドレス</label>
          <input id="email" type="email" onChange={handleEmailChange} />
          <p className="error-message">{emailError}</p>
          <label htmlFor="password">パスワード</label>
          <input id="password" type="password" onChange={handlePwdChange} />
          <button
            type="button"
            className="btn-login"
            onClick={handleSubmit}
            disabled={isValid}
          >
            ログイン
          </button>
          <Link className="link-new-account" to="/signup">
            新規アカウントを作成する
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
