import React, { useEffect, useState } from 'react';

import '@samsite/components/travel-page/style.scss';
import { TravelPagePropsType } from '@samsite/components/travel-page/types';
import { Map } from '@samsite/components/travel-page/map';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchTravelLocalities } from '@samsite/fetchers/travel/localities';
import { fetchTravelCountries } from '@samsite/fetchers/travel/countries';
import { getAllTravelCountriesSelector } from '@samsite/selectors/travel/countries';
import { updateMapMarkersGenerator, handleLocalitiesGenerator } from '@samsite/components/travel-page/effects';
import { getAllTravelLocalitiesGroupedByCountryCodeSelector } from '@samsite/components/travel-page/selectors';

const DumbTravelPage: React.FunctionComponent<TravelPagePropsType> = ({
    localities,
    countries,
    onFetchTravelLocalities,
    onFetchTravelCountries,
}) => {
    const [bounds, updateBounds] = useState(undefined);
    const [markers, updateMarkers] = useState(null);
    const [focusedCountry, updateFocusedCountry] = useState(null);

    useEffect(() => { onFetchTravelLocalities(); }, []);

    useEffect(
        handleLocalitiesGenerator(localities, onFetchTravelCountries),
        [localities && Object.keys(localities).length],
    );

    useEffect(
        updateMapMarkersGenerator(
            countries,
            localities,
            focusedCountry,
            updateBounds,
            updateMarkers,
            updateFocusedCountry,
        ),
        [
            countries && Object.keys(countries).length,
            localities && Object.keys(localities).length,
            focusedCountry,
        ],
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
    localities: getAllTravelLocalitiesGroupedByCountryCodeSelector,
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
