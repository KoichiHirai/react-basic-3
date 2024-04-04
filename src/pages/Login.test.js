import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();

  expect(screen.getByLabelText(/パスワード/)).toBeInTheDocument();
  expect(screen.getByLabelText(/パスワード/)).toHaveAttribute(
    'type',
    'password'
  );

  expect(screen.getByRole('button', { name: /ログイン/ })).toBeInTheDocument();
});
