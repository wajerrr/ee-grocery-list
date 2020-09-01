import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { render } from '@testing-library/react';

import { List } from './list';

import rootReducer from '../../reducers/root-reducer'

const store = createStore(rootReducer)

test('renders List', () => {
  
  const items = [{id:'1', text: 'bananas', isCompleted: false}, 
    {id:'2', text: 'eggs', isCompleted: true}
  ];
  const { getByDisplayValue } = render(<Provider store={store}><List items={items} /></Provider>);
  
  const el1 = getByDisplayValue(/bananas/i);
  expect(el1).toBeInTheDocument();

  const el2 = getByDisplayValue(/eggs/i);
  expect(el2).toBeInTheDocument();

});