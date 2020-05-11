import { StateObjectType } from '@samsite/store/types';
import { TravelCountryStateType, TravelLocalityStateType } from '@samsite/store/handlers/travel/types';
import { LatLngObjectType, MapMarkerType } from '@samsite/components/travel-page/map/types';
import { CountryMarker } from '@samsite/components/travel-page/country-marker';
import { LocalityMarker } from '@samsite/components/travel-page/locality-marker';
import React from 'react';
import { LatLngLimitsType } from '@samsite/components/travel-page/types';

export const handleLocalitiesGenerator = (
    localities: StateObjectType<TravelLocalityStateType[]>,
    fetchCountries: (countryCodes: string[]) => void,
): () => void => (): void => {
    if (localities && Object.keys(localities).length) {
        fetchCountries(Object.keys(localities));
    }
};

const COUNTRY_BOUND_PADDING = 2;

const createCountryMarkers = (
    countries: StateObjectType<TravelCountryStateType>,
    updateFocusedCountry: (countryCode: string) => void,
): [MapMarkerType[], [LatLngObjectType, LatLngObjectType]] => {
    if (countries && Object.keys(countries).length) {
        const countryMarkers: MapMarkerType[] = [];
        const limits: LatLngLimitsType = {
            lat: { min: null, max: null },
            lng: { min: null, max: null },
        };

        Object.values(countries).forEach(
            (country: TravelCountryStateType): void => {
                if (!limits.lat.min || country.latitude < limits.lat.min) limits.lat.min = country.latitude;
                if (!limits.lat.max || country.latitude > limits.lat.max) limits.lat.max = country.latitude;
                if (!limits.lng.min || country.longitude < limits.lng.min) limits.lng.min = country.longitude;
                if (!limits.lng.max || country.longitude > limits.lng.max) limits.lng.max = country.longitude;

                countryMarkers.push({
                    latLng: [country.latitude, country.longitude],
                    component: <CountryMarker country={country} updateFocusedCountry={updateFocusedCountry} />,
                    key: country.countryCode,
                });
            },
        );

        return [
            countryMarkers,
            [
                { lat: limits.lat.max + COUNTRY_BOUND_PADDING, lng: limits.lng.min - COUNTRY_BOUND_PADDING },
                { lat: limits.lat.min - COUNTRY_BOUND_PADDING, lng: limits.lng.max + COUNTRY_BOUND_PADDING },
            ],
        ];
    }

    return [null, null];
};

const LOCALITY_BOUND_PADDING = 0.5;

const createLocalityMarkers = (
    localities: TravelLocalityStateType[],
): [MapMarkerType[], [LatLngObjectType, LatLngObjectType]] => {
    if (localities && localities.length) {
        const localityMarkers: MapMarkerType[] = [];
        const limits: LatLngLimitsType = {
            lat: { min: null, max: null },
            lng: { min: null, max: null },
        };

        localities.forEach(
            (locality: TravelLocalityStateType): void => {
                if (!limits.lat.min || locality.latitude < limits.lat.min) limits.lat.min = locality.latitude;
                if (!limits.lat.max || locality.latitude > limits.lat.max) limits.lat.max = locality.latitude;
                if (!limits.lng.min || locality.longitude < limits.lng.min) limits.lng.min = locality.longitude;
                if (!limits.lng.max || locality.longitude > limits.lng.max) limits.lng.max = locality.longitude;

                localityMarkers.push({
                    latLng: [locality.latitude, locality.longitude],
                    component: <LocalityMarker locality={locality} />,
                    key: locality.localityId,
                });
            },
        );

        return [
            localityMarkers,
            [
                { lat: limits.lat.max + LOCALITY_BOUND_PADDING, lng: limits.lng.min - LOCALITY_BOUND_PADDING },
                { lat: limits.lat.min - LOCALITY_BOUND_PADDING, lng: limits.lng.max + LOCALITY_BOUND_PADDING },
            ],
        ];
    }

    return [null, null];
};

export const updateMapMarkersGenerator = (
    countries: StateObjectType<TravelCountryStateType>,
    localities: StateObjectType<TravelLocalityStateType[]>,
    focusedCountry: string,
    updateBounds: (
        bounds: [{lat: number, lng: number}, {lat: number, lng: number}],
    ) => void,
    updateMarkers: (markers: MapMarkerType[]) => void,
    updateFocusedCountry: (countryCode: string) => void,
): () => void => (): void => {
    let markers: MapMarkerType[] = null;
    let bounds: [LatLngObjectType, LatLngObjectType] = null;

    if (!focusedCountry) {
        [markers, bounds] = createCountryMarkers(countries, updateFocusedCountry);
    } else {
        [markers, bounds] = createLocalityMarkers(localities[focusedCountry]);
    }

    updateBounds(bounds);
    updateMarkers(markers);
};
