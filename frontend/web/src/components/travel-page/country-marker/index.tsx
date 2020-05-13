import React, { useState } from 'react';

// @ts-ignore: Typescript doesnt recognise scss :export
import styles from '@samsite/components/travel-page/country-marker/style.scss';
import { CountryMarkerPropsType } from '@samsite/components/travel-page/country-marker/types';
import { AsyncImage } from '@samsite/components/ui/async-image';
import { cssDimensionToPixels } from '@samsite/utils/css-dimensions-to-pixels';

export const boundingBoxDimensions = {
    height: cssDimensionToPixels(styles.height),
    width: cssDimensionToPixels(styles.width),
};

export const CountryMarker: React.FunctionComponent<CountryMarkerPropsType> = ({ country, updateFocusedCountry }) => {
    const [titleVisible, updateTitleVisible] = useState(false);

    const countryTitle = `${country.nativeName}${country.nativeName === country.name ? '' : ` (${country.name})`}`;

    const mouseEnterHandler = (): void => {
        updateTitleVisible(true);
    };
    const mouseLeaveHandler = (): void => {
        updateTitleVisible(false);
    };

    const clickHandler = (): void => {
        updateFocusedCountry(country.countryCode);
    };

    return (
        <div
            className={`country-marker ${titleVisible ? '-full' : '-compact'}`}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            onClick={clickHandler}
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
