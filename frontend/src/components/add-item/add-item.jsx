import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import { addListItemStart } from '../../actions/list-item-actions';

import './add-item.css'

export const AddItem = ({ onAdd }) => {
    const [inputValue, setInputvalue] = useState('');
    const inputEl = useRef(null);

    const onKeyPress = (event) => {
        if (event.charCode === 13) {
            onAdd(inputValue);
            setInputvalue('');
        }
    }

    const onClick = () => {
        onAdd(inputValue);
        setInputvalue('');
    }

    return (<div className='add-item-container'>
        <input
            data-testid="add-new-item-itnput"
            onKeyPress={onKeyPress} 
            value={inputValue} 
            ref={inputEl} 
            onChange={e => setInputvalue(e.target.value)}
        />
        <button onClick={onClick} >Add new item</button>
        </div>)
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onAdd: (value) => dispatch(addListItemStart(value))
})

export default connect(() =>({}), mapDispatchToProps)(AddItem)