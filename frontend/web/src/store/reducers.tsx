import { History } from 'history';
import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { fetchRequestHistoryStoreHandler } from '@samsite/store/handlers/fetch-request-history';
import { fetchGitUserStoreHandler } from '@samsite/store/handlers/git/users';
import { fetchGitReposStoreHandler } from '@samsite/store/handlers/git/repos';
import { fetchGitCommitsStoreHandler } from '@samsite/store/handlers/git/commits';
import { fetchInstagramUserStoreHandler } from '@samsite/store/handlers/instagram/users';
import { fetchInstagramMediaStoreHandler } from '@samsite/store/handlers/instagram/media';

export const loadCombinedReducers = (history: History): Reducer =>
    combineReducers({
        router: connectRouter(history),
        [fetchRequestHistoryStoreHandler.storeKey]: fetchRequestHistoryStoreHandler.reducer,

        [fetchGitUserStoreHandler.storeKey]: fetchGitUserStoreHandler.reducer,
        [fetchGitReposStoreHandler.storeKey]: fetchGitReposStoreHandler.reducer,
        [fetchGitCommitsStoreHandler.storeKey]: fetchGitCommitsStoreHandler.reducer,

        [fetchInstagramUserStoreHandler.storeKey]: fetchInstagramUserStoreHandler.reducer,
        [fetchInstagramMediaStoreHandler.storeKey]: fetchInstagramMediaStoreHandler.reducer,
    });
