import React, { useEffect, useState } from 'react';

import '@samsite/components/travel-page/style.scss';
import { TravelPagePropsType } from '@samsite/components/travel-page/types';
import { Map } from '@samsite/components/travel-page/map';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchTravelLocalities } from '@samsite/fetchers/travel/localities';
import { getAllTravelLocalitiesSelector } from '@samsite/selectors/travel/localities';
import { fetchTravelCountries } from '@samsite/fetchers/travel/countries';
import { getAllTravelCountriesSelector } from '@samsite/selectors/travel/countries';
import { TravelCountryStateType, TravelLocalityStateType } from '@samsite/store/handlers/travel/types';
import { MapMarkerType } from '@samsite/components/travel-page/map/types';
import { AsyncImage } from '@samsite/components/ui/async-image';

const BOUND_PADDING = 2;

const DumbTravelPage: React.FunctionComponent<TravelPagePropsType> = ({
    localities,
    countries,
    onFetchTravelLocalities,
    onFetchTravelCountries,
}) => {
    const [bounds, updateBounds] = useState(undefined);
    const [markers, updateMarkers] = useState(null);

    useEffect(
        () => {
            onFetchTravelLocalities();
        },
        [],
    );

    useEffect(
        () => {
            if (localities && Object.keys(localities).length) {
                onFetchTravelCountries(
                    Object.values(localities).map(
                        (locality: TravelLocalityStateType): string => locality.countryCode,
                    ),
                );
            }
        },
        [localities && Object.keys(localities).length],
    );

    useEffect(
        () => {
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
                            component: <AsyncImage
                                alt={country.name}
                                srcProgression={[country.flag]}
                                containerClass="country-marker"
                            />,
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
        },
        [countries && Object.keys(countries).length],
    );

    return (
        <main className="travel-page">
            <Map
                bounds={bounds}
                countries={countries}
                markers={markers}
            />
        </main>
    );
};

const mapStateToProps = createStructuredSelector({
    localities: getAllTravelLocalitiesSelector,
    countries: getAllTravelCountriesSelector,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            onFetchTravelLocalities: fetchTravelLocalities,
            onFetchTravelCountries: fetchTravelCountries,
        },
        dispatch,
    );

export const TravelPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DumbTravelPage);
