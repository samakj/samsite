import { StateObjectType, StoreObjectType } from '@samsite/store/types';
import { TravelLocalityStateType } from '@samsite/store/handlers/travel/types';
import { getAllTravelLocalitiesSelector } from '@samsite/selectors/travel/localities';

export const getAllTravelLocalitiesGroupedByCountryCodeSelector = (
    state: StoreObjectType<TravelLocalityStateType>,
): StateObjectType<TravelLocalityStateType[]> => {
    const allLocalities = getAllTravelLocalitiesSelector(state);

    return  allLocalities && Object.keys(allLocalities).length && Object.values(allLocalities).reduce(
        (
            acc: StateObjectType<TravelLocalityStateType[]>,
            locality: TravelLocalityStateType,
        ): StateObjectType<TravelLocalityStateType[]> => {
            if (!(locality.countryCode in acc)) {
                acc[locality.countryCode] = [];
            }
            acc[locality.countryCode].push(locality);
            return acc;
        },
        {},
    );
};
