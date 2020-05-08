import { generateFetchStoreHandler } from '@samsite/factories/fetch/storeHandlerFactory';
import { localitiesStoreKey } from '@samsite/store/keys';
import { TravelLocalityStateType } from '@samsite/store/handlers/travel/types';

export const fetchTravelLocalityStoreHandler = generateFetchStoreHandler<TravelLocalityStateType>(
    localitiesStoreKey,
    false,
);
