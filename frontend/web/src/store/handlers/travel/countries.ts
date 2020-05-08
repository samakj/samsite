import { countriesStoreKey } from '@samsite/store/keys';
import { generateFetchStoreHandler } from '@samsite/factories/fetch/storeHandlerFactory';
import { TravelCountryStateType } from '@samsite/store/handlers/travel/types';

export const fetchTravelCountryStoreHandler = generateFetchStoreHandler<TravelCountryStateType>(
    countriesStoreKey,
    true,
);
