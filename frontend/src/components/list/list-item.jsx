import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import { removeListItemStart, editListItemStart } from '../../actions/list-item-actions';

import './list.css';

export const ListItem = ({text, isCompleted, id, onRemove, onEdit}) => {
    
    const [inputValue, setInputvalue] = useState(text);

    const inputEl = useRef(null);

    const onBlur =() => {
        onEdit({text: inputValue, id, isCompleted});
    }

    const onChange = (e) => {
        setInputvalue(e.target.value)
    }
    const onKeyPress = (event) => {
        if (event.charCode === 13) {
            inputEl.current.blur();
        }
    }
    const onToogle = (e) => {
        onEdit({text: inputValue, id, isCompleted: e.target.checked });
    }

    return (
        <li className="listItem">
             <input
                data-testid="checkbox-completed"
				type="checkbox"
				checked={isCompleted}
				onChange={onToogle}
			/>
            <input
                disabled={isCompleted}
                className={`input-text${isCompleted? ' completed':''}`}
                value={inputValue}
                onChange={onChange}
                onKeyPress={onKeyPress} 
                ref={inputEl} 
                onBlur={onBlur} 
                onChange={onChange} 
            />
            <button className="button-remove" 
                onClick={()=>onRemove(id)}>remove</button>
        </li>
    )
}
const mapDispatchToProps = (dispatch, ownProps) => ({
    onEdit: ({id, text, isCompleted}) => dispatch(editListItemStart({id, text, isCompleted})),
    onRemove: (id) => dispatch(removeListItemStart({id}))
  })

export default connect(() =>({}), mapDispatchToProps)(ListItem)