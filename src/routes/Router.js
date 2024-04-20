import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ReviewList from '../pages/ReviewList';
import Profile from '../pages/Profile';
import New from '../pages/New';
import Detail from '../pages/Detail';
import DetailEdit from '../pages/DetailEdit';

function Router() {
  const [cookies, setToken] = useCookies(['authToken']);

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
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/edit/:id" element={<DetailEdit />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
