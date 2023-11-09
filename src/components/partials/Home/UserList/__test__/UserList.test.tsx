import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { UserList } from '../UserList';
import { render } from '../../../../../test-utils';

test('UserList', async () => {
  render(<UserList />);
  await waitFor(() => {
    expect(screen.getByText(/mojombo/i)).toBeInTheDocument();
  });
  const linkElement = screen.getByText(/mojombo/i);
  expect(linkElement).toHaveTextContent(/mojombo/i);
});
