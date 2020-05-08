import { StateObjectType, StoreObjectType } from '@samsite/store/types';
import { fetchTravelLocalityStoreHandler } from '@samsite/store/handlers/travel/localities';
import { TravelLocalityStateType } from '@samsite/store/handlers/travel/types';

export const getTravelLocalitySelector = (
    state: StoreObjectType<TravelLocalityStateType>,
    id: TravelLocalityStateType['localityId'],
): TravelLocalityStateType => id && fetchTravelLocalityStoreHandler.storeMaps.getKeyValue(state, id);

export const getTravelLocalitiesSelector = (
    state: StoreObjectType<TravelLocalityStateType>,
    ids: TravelLocalityStateType['localityId'][],
): StateObjectType<TravelLocalityStateType> =>
    ids && fetchTravelLocalityStoreHandler.storeMaps.getKeysValue(state, ids);

export const getAllTravelLocalitiesSelector = (
    state: StoreObjectType<TravelLocalityStateType>,
): StateObjectType<TravelLocalityStateType> => fetchTravelLocalityStoreHandler.storeMaps.getValue(state);
