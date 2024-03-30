import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ReviewList from '../pages/ReviewList';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReviewList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
