import React from 'react';

import List from './list/list'

import AddItem from './add-item/add-item';
import ClearCompleted from './clear-completed/clear-completed';

import './app.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
      <img className="logo" src="ee-logo.svg"  alt="Equal Experts logo" />
        <h1>Grocery List</h1>
      </header>
      <main className='app-main'>
        <div className="app-toolbar">
        <AddItem />
        <ClearCompleted />
        </div>
        <List items={[{text: 'yo', id:'1'}]}/>
      </main>
    </div>
  );
}

export default App;