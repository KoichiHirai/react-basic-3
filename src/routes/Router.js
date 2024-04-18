import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ReviewList from '../pages/ReviewList';
import Profile from '../pages/Profile';
import New from '../pages/New';

function Router() {
  const [cookies, setToken] = useCookies(['authToken']);

  console.log('Routers.js 前');
  console.log(cookies);

  if (cookies.authToken === 'undefined') {
    console.log('強制トークン削除');
    setToken('authToken', undefined);
  }

  console.log('Routers.js 後');
  console.log(cookies);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReviewList />} />
        {cookies.authToken ? (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/new" element={<New />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Login />} />
            <Route path="/new" element={<Login />} />
          </>
        )}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
