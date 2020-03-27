import {
    FetchActionObjectType,
    FetchDispatcherObjectType,
    FetchStoreHandlerObjectType,
} from '@samsite/factories/fetch/types';
import { generateActionTypes } from '@samsite/factories/store-handler/actionTypeFactory';
import {
    externalFetchActionPrefix,
    fetchActionMethods,
    internalFetchActionPrefix,
} from '@samsite/factories/fetch/constants';
import { generateUpdateReducer } from '@samsite/factories/store-handler/reducerFactory';
import { generateStoreMaps } from '@samsite/factories/store-handler/storeMapFactory';
import { generateFetchActionsObject } from '@samsite/factories/fetch/actionFactory';
import { StoreMapObjectType } from '@samsite/factories/store-handler/types';
import { Reducer } from 'redux';
import { generateDispatchers } from '@samsite/factories/fetch/dispatcherFactory';
import { StateObjectType } from '@samsite/store/types';

export const generateFetchStoreHandler = <StateValueType>(
    storeKey: string,
    internal: boolean = false,
): FetchStoreHandlerObjectType<StateValueType> => {
    const actionPrefix = internal ? internalFetchActionPrefix : externalFetchActionPrefix;
    const actionTypes = generateActionTypes(storeKey, fetchActionMethods, actionPrefix);
    const actions: FetchActionObjectType<StateValueType> = generateFetchActionsObject(
        actionTypes,
        fetchActionMethods,
    );
    const reducer: Reducer<StateObjectType<StateValueType>> = generateUpdateReducer(
        actionTypes.SUCCESS,
    );
    const dispatchers: FetchDispatcherObjectType<StateValueType> = generateDispatchers(actions);
    const storeMaps: StoreMapObjectType<StateValueType> = generateStoreMaps(storeKey);

    return {
        actionTypes,
        actions,
        dispatchers,
        reducer,
        storeKey,
        storeMaps,
        actionMethods: fetchActionMethods,
    };
};
