import React, { useEffect, useRef, useState } from 'react';

import '@samsite/components/travel-page/map/style.scss';
import { MapMarkerType, MapPropsType } from '@samsite/components/travel-page/map/types';
import { defaultMapStyles } from '@samsite/components/travel-page/map/mapStyle';
import { isClientSide } from '@samsite/utils/render-side';
import {
    fitNewBoundsGenerator,
    initGoogleMapObjectGenerator,
    loadScriptEffectGenerator,
} from '@samsite/components/travel-page/map/effects';
import { ComponentMarker } from '@samsite/components/travel-page/map/component-marker';

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
    bounds,
    markers,
}) => {
    const [scriptLoaded, updateScriptLoaded] = useState(!!(isClientSide() && window.google && window.google.maps));
    const [googleMapObject, updateGoogleMapObject] = useState(null);
    const [mutatedMarkers, updateMutatedMarkers] = useState(null);

    const containerRef = useRef(null);
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
        initGoogleMapObjectGenerator(containerRef, bounds, mapOptions, scriptLoaded, updateGoogleMapObject),
        [scriptLoaded],
    );

    useEffect(
        fitNewBoundsGenerator(bounds, googleMapObject),
        [bounds, googleMapObject],
    );

    useEffect(
        () => {
            if (googleMapObject && markers && markers.length) {
                updateMutatedMarkers(
                    markers.map(
                        (marker: MapMarkerType): JSX.Element => (
                            <ComponentMarker latLng={marker.latLng} map={googleMapObject} key={marker.key}>
                                { marker.component }
                            </ComponentMarker>
                        ),
                    ),
                );
            }
        },
        [googleMapObject && markers && markers.length],
    );

    return (
        <div className="map-outer-container">
            <div className="map-container" ref={ containerRef }>
                <p>Script load state: { `${scriptLoaded}` }</p>
            </div>
            <div className="component-markers">
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
    bounds: [
        { lat: 70, lng: -180 },
        { lat: -55, lng: 180 },
    ],
};

export { Map };
