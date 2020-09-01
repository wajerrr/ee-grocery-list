import listItemsReduer from './list-items-reducer';
import {
    ADD_LIST_ITEM,
    REMOVE_LIST_ITEM,
    EDIT_LIST_ITEM, 
    REMOVE_COMPLETED,
    GET_ITEMS_FULLFILLED,
    ADD_LIST_ITEM_FULLFILLED
} from '../actions/list-item-actions';

test('returns correct state for ADD_LIST_ITEM action',   () => {
    const id = '1';
    const text = 'text';
    const action = {type: ADD_LIST_ITEM, payload: {id, text}}
    const state = listItemsReduer({}, action);
    const expectedState = {[id]: {id, text, isCompleted: false }};
    
    expect(state).toEqual(expectedState);
 });

 test('returns correct state for REMOVE_LIST_ITEM action',   () => {
    const id = '1';
    const text = 'text';
    const action = {type: REMOVE_LIST_ITEM, payload: {id}};

    const state = listItemsReduer({[id]:{id, text}}, action);
    const expectedState = {};
    
    expect(state).toEqual(expectedState);
 });

 test('returns correct state for EDIT_LIST_ITEM action',   () => {
    const id = '1';
    const text = 'text';
    const isComeplted = false;
    const action = { type: EDIT_LIST_ITEM, payload: { id, text: 'new text', isCompleted: true }};

    const state = listItemsReduer({[id]:{id, text, isComeplted}}, action);
    const expectedState = { [id]:{ id, text: 'new text', isCompleted: true }};
    
    expect(state).toEqual(expectedState);
 });

 test('returns correct state for GET_ITEMS_FULLFILLED action',   () => {
    const items = {
        '1': {id: "1", text: 'text 1', isCompleted: true},
        '2': {id: "2", text: 'text 2', isCompleted: false}
    }

    const action = { type: GET_ITEMS_FULLFILLED, payload: {items}}
    const state = listItemsReduer({}, action);

    expect(state).toEqual(items);
 });

 test('returns correct state for ADD_LIST_ITEM_FULLFILLED action',   () => {
    const tempId = 'tempId';
    const newId = 'newId';
    const item = {id: newId, text: 'text', isCompleted: false};
    const action = {type: ADD_LIST_ITEM_FULLFILLED, payload: { tempId, item}};
    const state = listItemsReduer({ [tempId]: { ...item, id: tempId }}, action);
    const expectedState = { [newId]: item };

    expect(state).toEqual(expectedState);
 });

 test('returns correct state for REMOVE_COMPLETED action',   () => {
    const items = {
        '1': {id: "1", text: 'text 1', isCompleted: true},
        '2': {id: "2", text: 'text 2', isCompleted: false}
    }
    const action = { type: REMOVE_COMPLETED, payload: {completedIds: ['1','2']}}
    const state = listItemsReduer(items, action);

    expect(state).toEqual({});
 });