import React from 'react';

// @ts-ignore: Typescript doesnt recognise scss :export
import styles from '@samsite/components/travel-page/locality-marker/style.scss';
import { LocalityMarkerPropsType } from '@samsite/components/travel-page/locality-marker/types';
import { cssDimensionToPixels } from '@samsite/utils/css-dimensions-to-pixels';

export const boundingBoxDimensions = {
    height: cssDimensionToPixels(styles.height),
    width: cssDimensionToPixels(styles.width),
};

export const LocalityMarker: React.FunctionComponent<LocalityMarkerPropsType> = ({ locality }) => {
    return (
        <div className="locality-marker">
            <div className="locality-title">{ locality.name }</div>
        </div>
    );
};
