import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ReviewList from '../pages/ReviewList';

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
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
