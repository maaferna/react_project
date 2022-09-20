import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Promotions } from './promotions';
import { Comments } from './comments';
import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// helper to create react-redux-form
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}