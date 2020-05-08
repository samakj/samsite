import {
    defaultErrorHandler,
    generateFetchRequest,
} from '@samsite/factories/fetch/fetchRequestFactory';
import { TravelCountryResponseType } from '@samsite/fetchers/travel/types';
import { StateObjectType } from '@samsite/store/types';
import { TravelCountryStateType } from '@samsite/store/handlers/travel/types';
import { fetchTravelCountryStoreHandler } from '@samsite/store/handlers/travel/countries';

export const fetchTravelCountryResponseHandler = <ResponseObjectType, HandledResponseType>(
    response: TravelCountryResponseType,
): StateObjectType<TravelCountryStateType> => ({
    [response.alpha3Code.toUpperCase()]: {
        countryCode: response.alpha3Code,
        name: response.name,
        nativeName: response.nativeName,
        capital: response.capital,
        flag: response.flag,
        region: response.region,
        subregion: response.subregion,
        latitude: response.latlng[0],
        longitude: response.latlng[1],
    },
});

export const fetchTravelCountry = (
    countryCode: string,
) =>
    generateFetchRequest<TravelCountryResponseType, TravelCountryStateType>(
        `https://restcountries.eu/rest/v2/alpha/${countryCode}`,
        fetchTravelCountryStoreHandler.dispatchers,
        fetchTravelCountryResponseHandler,
        defaultErrorHandler,
    );

export const fetchTravelCountriesResponseHandler = <ResponseObjectType, HandledResponseType>(
    response: TravelCountryResponseType[],
): StateObjectType<TravelCountryStateType> =>
    response.reduce(
        (
            acc: StateObjectType<TravelCountryStateType>,
            country: TravelCountryResponseType,
        ): StateObjectType<TravelCountryStateType> => {
            acc[country.alpha3Code.toUpperCase()] = {
                countryCode: country.alpha3Code,
                name: country.name,
                nativeName: country.nativeName,
                capital: country.capital,
                flag: country.flag,
                region: country.region,
                subregion: country.subregion,
                latitude: country.latlng[0],
                longitude: country.latlng[1],
            };
            return acc;
        },
        {},
    );

export const fetchTravelCountries = (
    countryCodes: string[],
) => {
    const countryCodesQueryString = countryCodes.join(';');

    return generateFetchRequest(
        `https://restcountries.eu/rest/v2/alpha?codes=${countryCodesQueryString}`,
        fetchTravelCountryStoreHandler.dispatchers,
        fetchTravelCountriesResponseHandler,
        defaultErrorHandler,
    );
};
