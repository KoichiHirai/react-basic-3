import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders learn react link', () => {
  render(<Login />);

  expect(screen.getByLabelText(/ユーザーID/i)).toBeInTheDocument();

  expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/パスワード/i)).toHaveAttribute('type', 'password');

  expect(screen.getByRole('button', { name: /ログイン/i })).toBeInTheDocument();
});