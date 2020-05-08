import React, { useEffect, useState } from 'react';

import '@samsite/components/travel-page/map/style.scss';
import { MapPropsType } from '@samsite/components/travel-page/map/types';
import { isClientSide } from '@samsite/utils/render-side';

const apiBaseUrl = 'https://maps.googleapis.com/maps/api/js';
const apiKey = 'AIzaSyCeu7ked2XnDpbUUhJmB3Y4qN_dlZNDEew';
const apiLibs = 'geometry,drawing,places';
const apiVersion = 3;

export const Map: React.FunctionComponent<MapPropsType> = ({}) => {
    const [scriptLoaded, updateScriptLoaded] = useState(!!(isClientSide() && window.google && window.google.maps));

    useEffect(
        () => {
            const googleMapsApiScriptId = 'google-maps-api';

            if (!scriptLoaded && !document.getElementById(googleMapsApiScriptId)) {
                const tag = document.createElement('script');
                tag.id = googleMapsApiScriptId;
                tag.onload = () => updateScriptLoaded(true);
                tag.src = `${apiBaseUrl}?v=${apiVersion}&key=${apiKey}&libraries=${apiLibs}`;
                document.body.appendChild(tag);
            }
        },
    );

    return (
        <div className="map-container">
            <p>Script load state: { `${scriptLoaded}` }</p>
        </div>
    );
};
