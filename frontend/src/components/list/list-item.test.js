import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { render, fireEvent } from '@testing-library/react';

import { ListItem } from './list-item';

import rootReducer from '../../reducers/root-reducer'

const store = createStore(rootReducer)

test('renders ListItem', () => {
  
  const { getByDisplayValue, getByText, getByTestId } = render(<ListItem text='bananas' isCompleted={false} id='1'/>);
    
  const input = getByDisplayValue(/bananas/i);
  expect(input).toBeInTheDocument();

  const buttonRemove = getByText(/remove/i);
  expect(buttonRemove).toBeInTheDocument();

  const checkbox = getByTestId('checkbox-completed');
  expect(checkbox).toBeInTheDocument();

  expect(checkbox).toHaveProperty('checked', false);
});

test('calls  onRemove callback when remove button is pressed', () => {
  const onRemove= jest.fn()
  const { getByText } = render(<ListItem 
    onRemove={onRemove} 
    text='bananas' 
    isCompleted={false} 
    id='1'/>
  );
  
  const buttonRemove = getByText(/remove/i);
  fireEvent.click(buttonRemove);
  expect(onRemove).toHaveBeenCalledWith('1');
});

test('calls onEdit callback when blur', () => {
  const onEdit = jest.fn()

  const { getByDisplayValue } = render(<ListItem 
    onEdit={onEdit} 
    text='bananas' 
    isCompleted={false} 
    id='1'/>
  );
  const input = getByDisplayValue(/bananas/i);
  fireEvent.blur(input);
  expect(onEdit).toHaveBeenCalledWith({
    'id': '1', 'isCompleted': false, 'text': 'bananas'
  });
   
});

test('calls onEdit callback when checkbox is clicked', () => {
  const onEdit = jest.fn()

  const { getByTestId } = render(<ListItem 
    onEdit={onEdit} 
    text='bananas' 
    isCompleted={false} 
    id='1'/>
  );

  const checkbox = getByTestId('checkbox-completed');
  fireEvent.click(checkbox);
  expect(onEdit).toHaveBeenCalledWith({
    'id': '1', 'isCompleted': true, 'text': 'bananas'
  });
});