import React, { useEffect } from 'react';

import '@samsite/components/travel-page/style.scss';
import { TravelPagePropsType } from '@samsite/components/travel-page/types';
import { Map } from '@samsite/components/travel-page/map';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchTravelLocalities } from '@samsite/fetchers/travel/localities';
import { getAllTravelLocalitiesSelector } from '@samsite/selectors/travel/localities';

const DumbTravelPage: React.FunctionComponent<TravelPagePropsType> = ({
    localities,
    onFetchTravelLocalities,
}) => {
    useEffect(
        () => {
            onFetchTravelLocalities()
        },
        [],
    );

    return (
        <main className="travel-page">
            <Map />
        </main>
    );
};

const mapStateToProps = createStructuredSelector({
    localities: getAllTravelLocalitiesSelector,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            onFetchTravelLocalities: fetchTravelLocalities,
        },
        dispatch,
    );

export const TravelPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DumbTravelPage);
