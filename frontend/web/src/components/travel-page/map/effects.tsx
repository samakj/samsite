import Map = google.maps.Map;
import React, { RefObject } from 'react';
import { LatLngObjectType, MapMarkerType } from '@samsite/components/travel-page/map/types';
import { ComponentMarker } from '@samsite/components/travel-page/map/component-marker';

export const loadScriptEffectGenerator = (
    src: string,
    tagId: string,
    scriptLoaded: boolean,
    updateScriptLoaded: (value: boolean) => void,
): () => void => (): void => {
    if (!scriptLoaded && !document.getElementById(tagId)) {
        const tag = document.createElement('script');
        tag.id = tagId;
        tag.onload = () => updateScriptLoaded(true);
        tag.src = src;
        document.body.appendChild(tag);
    }
};

export const initGoogleMapObjectGenerator = (
    containerRef: RefObject<HTMLDivElement>,
    initialBounds: [LatLngObjectType, LatLngObjectType],
    mapOptions: google.maps.MapOptions,
    scriptLoaded: boolean,
    updateGoogleMapObject: (value: Map) => void,
): () => void => (): void => {
    if (scriptLoaded) {
        const googleMapsObject = new window.google.maps.Map(containerRef.current, mapOptions);
        updateGoogleMapObject(googleMapsObject);
    }
};

export const fitNewBoundsGenerator = (
    bounds: [LatLngObjectType, LatLngObjectType],
    map: google.maps.Map,
): () => void => (): void => {
    if (bounds && map) {
        map.fitBounds(
            new google.maps.LatLngBounds(
                new google.maps.LatLng(bounds[0].lat, bounds[0].lng),
                new google.maps.LatLng(bounds[1].lat, bounds[1].lng),
            ),
        );
    }
};

export const createComponentMarkersGenerator = (
    markers: MapMarkerType[],
    map: google.maps.Map,
    updateMutatedMarkers: (markers: JSX.Element[]) => void,
): () => void => (): void => {
    if (map && markers && markers.length) {
        updateMutatedMarkers(
            markers.map(
                (marker: MapMarkerType): JSX.Element => (
                    <ComponentMarker latLng={marker.latLng} map={map} key={marker.key}>
                        { marker.component }
                    </ComponentMarker>
                ),
            ),
        );
    }
};
