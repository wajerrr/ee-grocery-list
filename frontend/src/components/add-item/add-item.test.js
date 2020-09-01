import React from 'react';

import { render,fireEvent } from '@testing-library/react';
 
import { AddItem } from './add-item';

test('renders AddItem component', () => {
  
  const { getByText, getByTestId } = render(<AddItem />);
  const addNewItemButton = getByText(/Add new item/i);
  const addNewInput = getByTestId('add-new-item-itnput');
  expect(addNewItemButton).toBeInTheDocument();
  expect(addNewInput).toBeInTheDocument();
});

test('calls onAdd callback on click', () => {
  const onAdd = jest.fn();

  const { getByText, getByTestId } = render(<AddItem onAdd={onAdd}/>);
  const addNewItemButton = getByText(/Add new item/i);
  const addNewInput = getByTestId('add-new-item-itnput');
  fireEvent.change(addNewInput, { target: { value: 'new value' } });
  fireEvent.click(addNewItemButton);
  expect(onAdd).toHaveBeenCalledWith('new value');
});

test('calls onAdd callback on enter', () => {
  const onAdd = jest.fn();

  const { getByTestId } = render(<AddItem onAdd={onAdd}/>);
  
  const addNewInput = getByTestId('add-new-item-itnput');
  fireEvent.change(addNewInput, { target: { value: 'new value' } });
  fireEvent.keyPress(addNewInput, {charCode: 13});
  expect(onAdd).toHaveBeenCalledWith('new value');
});

