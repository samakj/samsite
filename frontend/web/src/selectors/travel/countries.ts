import { StateObjectType, StoreObjectType } from '@samsite/store/types';
import { fetchTravelCountryStoreHandler } from '@samsite/store/handlers/travel/countries';
import { TravelCountryStateType } from '@samsite/store/handlers/travel/types';

export const getTravelCountrySelector = (
    state: StoreObjectType<TravelCountryStateType>,
    id: TravelCountryStateType['countryCode'],
): TravelCountryStateType => id && fetchTravelCountryStoreHandler.storeMaps.getKeyValue(state, id);

export const getTravelCountriesSelector = (
    state: StoreObjectType<TravelCountryStateType>,
    ids: TravelCountryStateType['countryCode'][],
): StateObjectType<TravelCountryStateType> =>
    ids && fetchTravelCountryStoreHandler.storeMaps.getKeysValue(state, ids);

export const getAllTravelCountriesSelector = (
    state: StoreObjectType<TravelCountryStateType>,
): StateObjectType<TravelCountryStateType> => fetchTravelCountryStoreHandler.storeMaps.getValue(state);
