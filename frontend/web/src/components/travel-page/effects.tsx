import { StateObjectType } from '@samsite/store/types';
import { TravelCountryStateType, TravelLocalityStateType } from '@samsite/store/handlers/travel/types';
import { LatLngObjectType, MapMarkerType } from '@samsite/components/travel-page/map/types';
import { CountryMarker } from '@samsite/components/travel-page/country-marker';
import { LocalityMarker } from '@samsite/components/travel-page/locality-marker';
import React from 'react';

export const handleLocalitiesGenerator = (
    localities: StateObjectType<TravelLocalityStateType[]>,
    fetchCountries: (countryCodes: string[]) => void,
): () => void => (): void => {
    if (localities && Object.keys(localities).length) {
        fetchCountries(Object.keys(localities));
    }
};

const createCountryMarkers = (
    countries: StateObjectType<TravelCountryStateType>,
    updateFocusedCountry: (countryCode: string) => void,
): MapMarkerType[] => {
    if (countries && Object.keys(countries).length) {
        const countryMarkers: MapMarkerType[] = [];

        Object.values(countries).forEach(
            (country: TravelCountryStateType): void => {
                countryMarkers.push({
                    latLng: [country.latitude, country.longitude],
                    component: <CountryMarker country={country} updateFocusedCountry={updateFocusedCountry} />,
                    key: country.countryCode,
                });
            },
        );

        return countryMarkers;
    }

    return null;
};

const createLocalityMarkers = (
    localities: TravelLocalityStateType[],
): MapMarkerType[] => {
    if (localities && localities.length) {
        const localityMarkers: MapMarkerType[] = [];

        localities.forEach(
            (locality: TravelLocalityStateType): void => {
                localityMarkers.push({
                    latLng: [locality.latitude, locality.longitude],
                    component: <LocalityMarker locality={locality} />,
                    key: locality.localityId,
                });
            },
        );

        return localityMarkers;
    }

    return null;
};

export const updateMapMarkersGenerator = (
    countries: StateObjectType<TravelCountryStateType>,
    localities: StateObjectType<TravelLocalityStateType[]>,
    focusedCountry: string,
    updateMarkers: (markers: MapMarkerType[]) => void,
    updateFocusedCountry: (countryCode: string) => void,
): () => void => (): void => {
    let markers: MapMarkerType[] = null;

    if (!focusedCountry) {
        markers = createCountryMarkers(countries, updateFocusedCountry);
    } else {
        markers = createLocalityMarkers(localities[focusedCountry]);
    }

    updateMarkers(markers);
};
