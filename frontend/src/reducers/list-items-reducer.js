import {
    ADD_LIST_ITEM,
    REMOVE_LIST_ITEM,
    EDIT_LIST_ITEM, 
    REMOVE_COMPLETED,
    GET_ITEMS_FULLFILLED,
    ADD_LIST_ITEM_FULLFILLED
} from '../actions/list-item-actions';

const listItems = (state = {}, {type, payload}) => {
    switch (type) {
      case GET_ITEMS_FULLFILLED:
          return payload.items || {};
      case ADD_LIST_ITEM:
        return {
          ...state,
          [payload.id]: {
            id: payload.id,
            text: payload.text,
            isCompleted: false
          }
        }
        case ADD_LIST_ITEM_FULLFILLED:
            const newState1 = {...state};
            delete newState1[payload.tempId]
            const item = payload.item;
            newState1[item.id] = item;
            return newState1;
        case REMOVE_LIST_ITEM:
            let newState = {...state};
            delete newState[payload.id]
            return newState;
        case EDIT_LIST_ITEM:
            return {
                ...state,
                [payload.id]: {
                    id: payload.id,
                    text: payload.text,
                    isCompleted: payload.isCompleted
                }
            }
        case REMOVE_COMPLETED:
            const newState2 = {...state};
            payload.completedIds.forEach(id => {
                delete newState2[id];
            })   
            return newState2;
      default:
        return state
    }
  }
  
  export default listItems