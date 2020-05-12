import React, { useEffect, useRef, useState } from 'react';

import '@samsite/components/travel-page/map/style.scss';
import { MapPropsType } from '@samsite/components/travel-page/map/types';
import { defaultMapStyles } from '@samsite/components/travel-page/map/mapStyle';
import { isClientSide } from '@samsite/utils/render-side';
import {
    initGoogleMapObjectGenerator,
    loadScriptEffectGenerator, updateMutatedMarkersGenerator,
} from '@samsite/components/travel-page/map/effects';

const apiBaseUrl = 'https://maps.googleapis.com/maps/api/js';
const apiKey = 'AIzaSyCeu7ked2XnDpbUUhJmB3Y4qN_dlZNDEew';
const apiLibs = 'geometry,drawing,places';
const apiVersion = 3;

const Map: React.FunctionComponent<MapPropsType> = ({
    zoom,
    center,
    disableDefaultUI,
    backgroundColor,
    mapStyles,
    markers,
}) => {
    const [scriptLoaded, updateScriptLoaded] = useState(null);
    const [googleMapObject, updateGoogleMapObject] = useState(null);
    const [mutatedMarkers, updateMutatedMarkers] = useState(null);

    const mapContainerRef = useRef(null);
    const markerContainerRef = useRef(null);
    const mapOptions = {
        zoom,
        center,
        disableDefaultUI,
        backgroundColor,
        styles: mapStyles,
    };

    useEffect(
        loadScriptEffectGenerator(
            `${apiBaseUrl}?v=${apiVersion}&key=${apiKey}&libraries=${apiLibs}`,
            `google-maps-script`,
            scriptLoaded,
            updateScriptLoaded,
        ),
        [],
    );

    useEffect(
        initGoogleMapObjectGenerator(mapContainerRef, mapOptions, scriptLoaded, updateGoogleMapObject),
        [scriptLoaded],
    );

    useEffect(
        updateMutatedMarkersGenerator(markers, googleMapObject, markerContainerRef, updateMutatedMarkers),
        [googleMapObject && markerContainerRef && markers && markers.length],
    );

    return (
        <div className="map-outer-container">
            <div className="map-container" ref={mapContainerRef}>
                <p>Script load state: { `${scriptLoaded}` }</p>
            </div>
            <div className="component-markers" ref={markerContainerRef}>
                { mutatedMarkers }
            </div>
        </div>
    );
};

Map.defaultProps = {
    center: {
        lat: 0,
        lng: 0,
    },
    disableDefaultUI: true,
    backgroundColor: 'none',
    mapStyles: defaultMapStyles,
};

export { Map };
