import React, { useEffect } from 'react';

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
import { TravelLocalityStateType } from '@samsite/store/handlers/travel/types';

const DumbTravelPage: React.FunctionComponent<TravelPagePropsType> = ({
    localities,
    countries,
    onFetchTravelLocalities,
    onFetchTravelCountries,
}) => {
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

    return (
        <main className="travel-page">
            <Map />
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
