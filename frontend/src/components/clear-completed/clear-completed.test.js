import React from 'react';

import { render,fireEvent } from '@testing-library/react';
 
import { ClearCompleted } from './clear-completed';

test('renders ClearCompleted button component when areItemsCompleted is true', () => {
  
  const { getByText } = render(<ClearCompleted areItemsCompleted={true} />);
  
  const button = getByText(/Clear Completed/i);
  expect(button).toBeInTheDocument();

});

test('not render ClearCompleted button component when areItemsCompleted is fale', () => {
  const { queryByText } = render(<ClearCompleted areItemsCompleted={false} />);
  
  const button = queryByText(/Clear Completed/i);
  expect(button).not.toBeInTheDocument();

});

test('calls onRemoveCompleted callback on click', () => {
  const onRemoveCompleted = jest.fn();

  const { getByText } = render(<ClearCompleted onRemoveCompleted={onRemoveCompleted} areItemsCompleted={true}/>);
  const button = getByText(/Clear Completed/i);
  
  fireEvent.click(button);
  expect(onRemoveCompleted).toHaveBeenCalledTimes(1);
});