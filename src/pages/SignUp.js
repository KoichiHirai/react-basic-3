import './SignUp.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Compressor from 'compressorjs';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [token, setToken] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
  const isValid = !name || !email || emailError || !pwd || pwdError || !image;

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setEmailError('');
    } else {
      setEmailError('正しいメールアドレスを入力してください');
    }
  };
  const handlePwdChange = (e) => {
    setPwd(e.target.value);
    if (validatePassword(e.target.value)) {
      setPwdError('');
    } else {
      setPwdError(
        '8文字以上で英字の大文字小文字と数字を含むパスワードを設定してください'
      );
    }
  };
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  };
  const handleSubmit = (e) => {
    //ユーザー作成時にPOSTするデータを生成
    const signupData = {
      name: name,
      email: email,
      password: pwd,
    };

    //画像を圧縮し、アイコンアップロード時にPOSTするデータ
    new Compressor(image, {
      quality: 0.7, // 画像の品質を指定
      maxWidth: 320, // リサイズ後の最大幅、アイコンの大きさに合わせて変更
      maxHeight: 320, // リサイズ後の最大高さ、アイコンの大きさに合わせて変更
      success: async (result) => {
        const iconData = new FormData();
        iconData.append('icon', result);

        try {
          // axiosでPOSTしてユーザー作成する
          const responseUserCreate = await axios.post(
            'https://railway.bookreview.techtrain.dev/users',
            signupData
          );
          // setToken(responseUserCreate.data.token);
          setCookie('authToken', responseUserCreate.data.token, {
            path: '/',
            sameSite: 'strict',
          });
          // axiosでPOSTしてプロフィール画像を登録する
          const responseIconUpload = await axios.post(
            'https://railway.bookreview.techtrain.dev/uploads',
            iconData,
            {
              headers: {
                Authorization: `Bearer ${responseUserCreate.data.token}`,
              },
            }
          );
          setIconUrl(responseIconUpload.data.iconUrl);
          navigate('/');
        } catch (error) {
          console.log(error);
          setErrorMessage(
            `サインアップに失敗しました。 ${error.response.data.ErrorMessageJP}`
          );
        }
      },
      error: (err) => {
        // console.error('Compression error:', err.message);
        setErrorMessage('画像の処理中にエラーが発生しました。');
      },
    });
  };

  return (
    <div className="signup">
      <form className="form">
        <h2>アカウント新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <label htmlFor="name">名前</label>
        <input id="name" type="text" onChange={handleNameChange} />
        <label htmlFor="email">メールアドレス</label>
        <input id="email" type="email" onChange={handleEmailChange} />
        <p className="error-message">{emailError}</p>
        <label htmlFor="password">パスワード</label>
        <input id="password" type="password" onChange={handlePwdChange} />
        <p className="error-message">{pwdError}</p>
        <label>プロフィール画像</label>
        <input
          className="btn-image"
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleImageChange}
        />
        <div className="note">
          ※画像はPNG形式かJPEG形式のものをご利用ください
        </div>
        <button
          type="button"
          className="btn-new-account"
          onClick={handleSubmit}
          disabled={isValid}
        >
          新規作成
        </button>
        <Link className="link-login" to="/login">
          ログイン画面に戻る
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
