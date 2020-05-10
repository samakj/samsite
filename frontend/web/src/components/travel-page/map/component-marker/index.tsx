import React, { useEffect, useRef, useState } from 'react';

import '@samsite/components/travel-page/map/component-marker/style.scss';
import { ComponentMarkerPropsType } from '@samsite/components/travel-page/map/component-marker/types';
import {
    createComponentMarkerOverlayView,
} from '@samsite/components/travel-page/map/component-marker/component-marker-overlay-view';

export const ComponentMarker: React.FunctionComponent<ComponentMarkerPropsType> = ({
    latLng,
    map,
    children,
}) => {
    if (!map) return null;

    const [overlayView, updateOverlayView] = useState(null);
    const ref = useRef(null);

    useEffect(
        () => {
            if (ref && ref.current && !overlayView) {
                updateOverlayView(
                    createComponentMarkerOverlayView(
                        ref,
                        new google.maps.LatLng(...latLng),
                        map,
                    ),
                );
            }
        },
        [ref],
    );

    return (
        <div className="component-marker" ref={ ref }>
            { children }
        </div>
    );
};
