import React from 'react';
import { connect } from 'react-redux';

import { removeCompletedStart } from '../../actions/list-item-actions';

import './clear-completed.css';

export const ClearCompleted = ({onRemoveCompleted, areItemsCompleted}) => 
    areItemsCompleted ? 
        <button className="clear-completed" onClick={onRemoveCompleted}>Clear Completed</button> 
        : null

const mapDispatchToProps = (dispatch) => ({
    onRemoveCompleted: () => dispatch(removeCompletedStart())
})

const mapStateToProps = state => ({
  areItemsCompleted: Object.values(state.listItems).some(item => item.isCompleted)
});

export default connect(mapStateToProps, mapDispatchToProps)(ClearCompleted)