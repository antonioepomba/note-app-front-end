import { render, screen } from '@testing-library/react';
//import AccountOverview from './account-overview';
import Login  from '../src/pages/Login'

test('renders learn react link', () => {
  render(<Login />);
  const element = screen.getByText(<login />);
  expect(element).toBeInTheDocument();
});
