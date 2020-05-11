import { TravelCountryStateType } from '@samsite/store/handlers/travel/types';

export interface CountryMarkerPropsType {
    country: TravelCountryStateType;
    updateFocusedCountry: (countryCode: string) => void;
}
