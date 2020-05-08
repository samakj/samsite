import { apiRoot } from '@samsite/fetchers/travel/config';
import {
    defaultErrorHandler,
    generateFetchRequest,
} from '@samsite/factories/fetch/fetchRequestFactory';
import {
    GetTravelLocalitiesResponseType,
    GetTravelLocalityResponseType,
    TravelLocalityResponseType,
} from '@samsite/fetchers/travel/types';
import { FetchRequestType } from '@samsite/factories/fetch/types';
import { StateObjectType } from '@samsite/store/types';
import { fetchTravelLocalityStoreHandler } from '@samsite/store/handlers/travel/localities';
import { TravelLocalityStateType } from '@samsite/store/handlers/travel/types';

export const fetchLocalityResponseHandler = <ResponseObjectType, HandledResponseType>(
    response: GetTravelLocalityResponseType,
): StateObjectType<TravelLocalityStateType> => ({
    [response.locality.locality_id]: {
        localityId: response.locality.locality_id,
        name: response.locality.name,
        countryCode: response.locality.country_code,
        latitude: response.locality.latitude,
        longitude: response.locality.longitude,
        gmapsPlaceId: response.locality.gmaps_place_id,
    },
});

export const fetchTravelLocality = (
    localityId: number,
): FetchRequestType =>
    generateFetchRequest<GetTravelLocalityResponseType, TravelLocalityStateType>(
        `${apiRoot}/v0/localities/${localityId}`,
        fetchTravelLocalityStoreHandler.dispatchers,
        fetchLocalityResponseHandler,
        defaultErrorHandler,
    );

export const fetchLocalitiesResponseHandler = <ResponseObjectType, HandledResponseType>(
    response: GetTravelLocalitiesResponseType,
): StateObjectType<TravelLocalityStateType> =>
    response.localities.reduce(
        (
            acc: StateObjectType<TravelLocalityStateType>,
            locality: TravelLocalityResponseType,
        ): StateObjectType<TravelLocalityStateType> => {
            acc[locality.locality_id] = {
                localityId: locality.locality_id,
                name: locality.name,
                countryCode: locality.country_code,
                latitude: locality.latitude,
                longitude: locality.longitude,
                gmapsPlaceId: locality.gmaps_place_id,
            };
            return acc;
        },
        {},
    );

export const fetchTravelLocalities = (
    localityId?: number | number[],
    name?: string | string[],
    countryCode?: string | string[],
): FetchRequestType => {
    let params = '';

    if (localityId) {
        Array.isArray(localityId) ?
            localityId.forEach((value: number): void => { params += `&locality_id=${ value }`; }) :
            params += `&locality_id=${localityId}`;
    }
    if (name) {
        Array.isArray(name) ?
            name.forEach((value: string): void => { params += `&name=${ value }`; }) :
            params += `&name=${name}`;
    }
    if (countryCode) {
        Array.isArray(countryCode) ?
            countryCode.forEach((value: string): void => { params += `&country_code=${ value }`; }) :
            params += `&countryCode=${countryCode}`;
    }

    return generateFetchRequest<GetTravelLocalitiesResponseType, TravelLocalityStateType>(
        `${apiRoot}/v0/localities/`,
        fetchTravelLocalityStoreHandler.dispatchers,
        fetchLocalitiesResponseHandler,
        defaultErrorHandler,
    );
};
