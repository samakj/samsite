import React, { useState } from 'react';

import '@samsite/components/travel-page/country-marker/style.scss';
import { CountryMarkerPropsType } from '@samsite/components/travel-page/country-marker/types';
import { AsyncImage } from '@samsite/components/ui/async-image';

export const CountryMarker: React.FunctionComponent<CountryMarkerPropsType> = ({ country }) => {
    const [titleVisible, updateTitleVisible] = useState(false);

    const countryTitle = `${country.nativeName}${country.nativeName === country.name ? '' : ` (${country.name})`}`;

    const mouseEnterHandler = (): void => {
        updateTitleVisible(true);
    };
    const mouseLeaveHandler = (): void => {
        updateTitleVisible(false);
    };

    return (
        <div
            className={`country-marker ${titleVisible ? '-full' : '-compact'}`}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        >
            <div className="country-title">{ countryTitle }</div>
            <AsyncImage
                alt={countryTitle}
                srcProgression={[country.flag]}
                containerClass="country-marker-image-container"
                imageClass="country-marker-image"
            />
        </div>
    );
};
