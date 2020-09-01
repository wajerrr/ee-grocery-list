import React from 'react';

import { connect } from 'react-redux'
import ListItem from './list-item'

import './list.css';

export const List = ({items}) => (
    <ul className="list">
        {items.map(item => <ListItem  {...item} key={item.id}/> )}
    </ul>
)

const mapStateToProps = state => ({
        items: Object.values(state.listItems)
});
  
export default connect(mapStateToProps, null)(List)