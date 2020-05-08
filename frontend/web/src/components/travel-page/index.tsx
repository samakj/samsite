import React from 'react';

import '@samsite/components/travel-page/style.scss';
import { TravelPagePropsType } from '@samsite/components/travel-page/types';
import { Map } from '@samsite/components/travel-page/map';

export const TravelPage: React.FunctionComponent<TravelPagePropsType> = ({}) => {
    return (
        <main className="travel-page page-width-wrapper">
            <Map />
        </main>
    );
};
