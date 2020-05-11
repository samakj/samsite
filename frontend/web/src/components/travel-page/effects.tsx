import { StateObjectType } from '@samsite/store/types';
import { TravelCountryStateType, TravelLocalityStateType } from '@samsite/store/handlers/travel/types';
import { MapMarkerType } from '@samsite/components/travel-page/map/types';
import { CountryMarker } from '@samsite/components/travel-page/country-marker';
import React from 'react';

export const handleLocalitiesGenerator = (
    localities: StateObjectType<TravelLocalityStateType[]>,
    fetchCountries: (countryCodes: string[]) => void,
): () => void => (): void => {
    if (localities && Object.keys(localities).length) {
        fetchCountries(Object.keys(localities));
    }
};

const BOUND_PADDING = 2;

export const handleCountriesGenerator = (
    countries: StateObjectType<TravelCountryStateType>,
    updateBounds: (
        bounds: [{lat: number, lng: number}, {lat: number, lng: number}],
    ) => void,
    updateMarkers: (markers: MapMarkerType[]) => void,
): () => void => (): void => {
    if (countries && Object.keys(countries).length) {
        const countryMarkers: MapMarkerType[] = [];
        const bounds: {
            lat: { min: number, max: number },
            lng: { min: number, max: number },
        } = {
            lat: { min: null, max: null },
            lng: { min: null, max: null },
        };

        Object.values(countries).forEach(
            (country: TravelCountryStateType): void => {
                if (!bounds.lat.min || country.latitude < bounds.lat.min) bounds.lat.min = country.latitude;
                if (!bounds.lat.max || country.latitude > bounds.lat.max) bounds.lat.max = country.latitude;
                if (!bounds.lng.min || country.longitude < bounds.lng.min) bounds.lng.min = country.longitude;
                if (!bounds.lng.max || country.longitude > bounds.lng.max) bounds.lng.max = country.longitude;

                countryMarkers.push({
                    latLng: [country.latitude, country.longitude],
                    component: <CountryMarker country={country} />,
                    key: country.countryCode,
                });
            },
        );

        updateBounds([
            { lat: bounds.lat.max + BOUND_PADDING, lng: bounds.lng.min - BOUND_PADDING },
            { lat: bounds.lat.min - BOUND_PADDING, lng: bounds.lng.max + BOUND_PADDING },
        ]);
        updateMarkers(countryMarkers);
    }
};
