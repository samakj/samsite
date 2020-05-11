import React from 'react';

import '@samsite/components/travel-page/locality-marker/style.scss';
import { LocalityMarkerPropsType } from '@samsite/components/travel-page/locality-marker/types';

export const LocalityMarker: React.FunctionComponent<LocalityMarkerPropsType> = ({ locality }) => {
    return (
        <div className="locality-marker">
            <div className="locality-title">{ locality.name }</div>
        </div>
    );
};
