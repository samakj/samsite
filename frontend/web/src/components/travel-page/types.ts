import { StateObjectType } from '@samsite/store/types';
import { TravelCountryStateType, TravelLocalityStateType } from '@samsite/store/handlers/travel/types';

export interface TravelPagePropsType {
    localities: StateObjectType<TravelLocalityStateType[]>,
    countries: StateObjectType<TravelCountryStateType>,
    onFetchTravelLocalities: () => void,
    onFetchTravelCountries: (countryCodes: string[]) => void,
}

export interface BackButtonPropsType {
    updateFocusedCountry: (countryCode: string) => void;
}

export interface LatLngLimitsType {
    lat: { min: number, max: number },
    lng: { min: number, max: number },
}
