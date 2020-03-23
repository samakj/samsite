import { generateActionsObject } from '@samsite/factories/store-handler/actionFactory';
import { generateActionTypes } from '@samsite/factories/store-handler/actionTypeFactory';
import { generateUpdateDeleteReducer, generateUpdateReducer } from '@samsite/factories/store-handler/reducerFactory';
import { generateStoreMaps } from '@samsite/factories/store-handler/storeMapFactory';
import {
    DispatcherObjectType,
    StoreHandlerObjectType,
    StoreMapObjectType
} from '@samsite/factories/store-handler/types';
import { generateDispatchers } from '@samsite/factories/store-handler/dispatcherFactory';
import { ActionObjectType, StateObjectType } from '@samsite/store/types';
import { Reducer } from 'redux';

export const generateUpdateDeleteStoreHandler = <StateValueType>(storeKey: string): StoreHandlerObjectType<StateValueType> => {
    const actionMethods = { UPDATE: 'UPDATE', DELETE: 'DELETE' };
    const actionTypes = generateActionTypes(storeKey, actionMethods);
    const actions: ActionObjectType<StateValueType> = generateActionsObject(actionTypes, actionMethods);
    const reducer: Reducer<StateObjectType<StateValueType>> = generateUpdateDeleteReducer(actionTypes['UPDATE'], actionTypes['DELETE']);
    const dispatchers: DispatcherObjectType<StateValueType> = generateDispatchers(actions);
    const storeMaps: StoreMapObjectType<StateValueType> = generateStoreMaps(storeKey);

    return {
        actions,
        actionMethods,
        actionTypes,
        dispatchers,
        reducer,
        storeMaps,
        storeKey,
    };
};

export const generateUpdateStoreHandler = <StateValueType>(storeKey: string): StoreHandlerObjectType<StateValueType> => {
    const actionMethods = { UPDATE: 'UPDATE' };
    const actionTypes = generateActionTypes(storeKey, actionMethods);
    const actions: ActionObjectType<StateValueType> = generateActionsObject(actionTypes, actionMethods);
    const reducer: Reducer<StateObjectType<StateValueType>> = generateUpdateReducer(actionTypes['UPDATE']);
    const dispatchers: DispatcherObjectType<StateValueType> = generateDispatchers(actions);
    const storeMaps: StoreMapObjectType<StateValueType> = generateStoreMaps(storeKey);

    return {
        actions,
        actionMethods,
        actionTypes,
        dispatchers,
        reducer,
        storeMaps,
        storeKey,
    };
};

