import { StateObjectType } from '@samsite/store/types';
import { TravelCountryStateType, TravelLocalityStateType } from '@samsite/store/handlers/travel/types';

export interface TravelPagePropsType {
    localities: StateObjectType<TravelLocalityStateType>,
    countries: StateObjectType<TravelCountryStateType>,
    onFetchTravelLocalities: () => void,
    onFetchTravelCountries: (countryCodes: string[]) => void,
}
