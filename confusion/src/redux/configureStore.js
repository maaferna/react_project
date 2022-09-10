import { legacy_createStore as createStore } from 'redux';
import { Reducer, initialState } from './reducer';

export const ConfigureStore = () => {
    const store = createStore(
        Reducer, 
        initialState
    );
    return store
}