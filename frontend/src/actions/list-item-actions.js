import uuid from 'uuid';

import api from '../api';

export const ADD_LIST_ITEM = 'ADD_LIST_ITEM';
export const ADD_LIST_ITEM_FULLFILLED = 'ADD_LIST_ITEM_FULLFILLED';
export const ADD_LIST_ITEM_ERROR = 'ADD_LIST_ITEM_FULLFILLED';

export const REMOVE_LIST_ITEM  = 'REMOVE_LIST_ITEM';
export const EDIT_LIST_ITEM  = 'EDIT_LIST_ITEM';
export const REMOVE_COMPLETED = 'REMOVE_COMPLETED';

export const GET_ITEMS_FULLFILLED = 'GET_ITEMS_FULLFILLED';
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

export const getItemsFulfilled = (items) => ({
  type: GET_ITEMS_FULLFILLED,
    payload: {
        items
    }
});

export const getItemsError = (error) => ({
  type: GET_ITEMS_ERROR,
    payload: {
        error
    }
});

export function getItems() {
  return function(dispatch) {
    return api.getItems()
    .then(response => response.json())
    .then(
      items => dispatch(getItemsFulfilled(items)),
      error => dispatch(getItemsError(error))
    );
  }
}

export const addListItem = (text, id) => ({
    type: ADD_LIST_ITEM,
    payload: {
        text, id
    }
});

export const addListItemFullfilled = (item, tempId) => ({
  type: ADD_LIST_ITEM_FULLFILLED,
  payload: {
    item, tempId
  }
});

export const addListItemError = (error) => ({
  type: ADD_LIST_ITEM_ERROR,
    payload: {
        error
    }
});

export const addListItemStart = text => dispatch => {
  const tempId = uuid();
  dispatch(addListItem(text, tempId));
  return api.addListItem(text)
    .then(response => response.json())
    .then(
      item => dispatch(addListItemFullfilled(item, tempId)),
      error => dispatch(addListItemError(error))
    );
}

export const removeListItem = ({id}) => ({
    type: REMOVE_LIST_ITEM,
    payload: {
        id
    }
})

export const removeListItemStart = ({id}) => dispatch => {
  dispatch(removeListItem({id}));
  return api.removeListItem(id)
    .then(response => response.json())
}

  export const editListItem = ({text, id, isCompleted}) => ({
    type: EDIT_LIST_ITEM,
    payload: {
        text, id, isCompleted
    }
  })

  export const editListItemStart = ({text, id, isCompleted}) => dispatch => {
    dispatch(editListItem({text, id, isCompleted}));
    return api.editListItem({text, id, isCompleted})
  }

  export const removeCompleted = (completedIds) => ({
    type: REMOVE_COMPLETED,
    payload: {completedIds}
  })


  export const removeCompletedStart = () => (dispatch, getState) => {
    console.log('removeCompletedStart')
    const completedIds = Object.values(getState().listItems)
      .filter(item => item.isCompleted)
      .map(item => item.id);
    dispatch(removeCompleted(completedIds));
    
    return Promise.all(completedIds.map(id => api.removeListItem(id)));
  }