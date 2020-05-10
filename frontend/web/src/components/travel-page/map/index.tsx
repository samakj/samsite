import React, { useEffect, useRef, useState } from 'react';

import '@samsite/components/travel-page/map/style.scss';
import { MapPropsType } from '@samsite/components/travel-page/map/types';
import { defaultMapStyles } from '@samsite/components/travel-page/map/mapStyle';
import { isClientSide } from '@samsite/utils/render-side';
import { initGoogleMapObject, loadScriptEffectGenerator } from '@samsite/components/travel-page/map/effects';

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
    countries,
}) => {
    const [scriptLoaded, updateScriptLoaded] = useState(!!(isClientSide() && window.google && window.google.maps));
    const [googleMapObject, updateGoogleMapObject] = useState(null);
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
        initGoogleMapObject(containerRef, bounds, mapOptions, scriptLoaded, updateGoogleMapObject),
        [scriptLoaded],
    );

    useEffect(
        () => {
            if (bounds && googleMapObject) {
                googleMapObject.fitBounds(
                    new google.maps.LatLngBounds(
                        new google.maps.LatLng(bounds[0].lat, bounds[0].lng),
                        new google.maps.LatLng(bounds[1].lat, bounds[1].lng),
                    ),
                );
            }
        },
        [bounds, googleMapObject],
    );

    return (
        <div className="map-container" ref={ containerRef }>
            <p>Script load state: { `${scriptLoaded}` }</p>
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
