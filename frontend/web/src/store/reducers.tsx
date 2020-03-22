import { History } from 'history';
import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';

export const loadCombinedReducers = (history: History): Reducer =>
    combineReducers({
        router: connectRouter(history),
    });
