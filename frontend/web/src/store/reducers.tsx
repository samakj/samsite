import { History } from 'history';
import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { fetchRequestHistoryStoreHandler } from '@samsite/store/handlers/fetch-request-history';
import { fetchGitUsersStoreHandler } from '@samsite/store/handlers/git/users';
import { fetchGitReposStoreHandler } from '@samsite/store/handlers/git/repos';
import { fetchGitCommitsStoreHandler } from '@samsite/store/handlers/git/commits';

export const loadCombinedReducers = (history: History): Reducer =>
    combineReducers({
        router: connectRouter(history),
        [fetchRequestHistoryStoreHandler.storeKey]: fetchRequestHistoryStoreHandler.reducer,

        [fetchGitUsersStoreHandler.storeKey]: fetchGitUsersStoreHandler.reducer,
        [fetchGitReposStoreHandler.storeKey]: fetchGitReposStoreHandler.reducer,
        [fetchGitCommitsStoreHandler.storeKey]: fetchGitCommitsStoreHandler.reducer,
    });
