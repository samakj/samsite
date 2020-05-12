import Map = google.maps.Map;
import React, { RefObject } from 'react';
import { LatLngLimitsType, MapMarkerType } from '@samsite/components/travel-page/map/types';
import { ComponentMarker } from '@samsite/components/travel-page/map/component-marker';
import { isClientSide } from '@samsite/utils/render-side';

export const loadScriptEffectGenerator = (
    src: string,
    tagId: string,
    scriptLoaded: boolean,
    updateScriptLoaded: (value: boolean | Error) => void,
): () => void => (): void => {
    if (isClientSide() && window.google && window.google.maps) {
        updateScriptLoaded(true)
    } else if (!scriptLoaded && !document.getElementById(tagId)) {
        const tag = document.createElement('script');
        tag.id = tagId;
        tag.onload = (): void => updateScriptLoaded(true);
        tag.onerror = (): void => updateScriptLoaded(new Error(`Failed to load script at: '${src}'`));
        tag.src = src;
        document.body.appendChild(tag);
    }
};

export const initGoogleMapObjectGenerator = (
    containerRef: RefObject<HTMLDivElement>,
    mapOptions: google.maps.MapOptions,
    scriptLoaded: boolean | Error,
    updateGoogleMapObject: (value: Map) => void,
): () => void => (): void => {
    if (scriptLoaded && !(scriptLoaded instanceof Error)) {
        const googleMapsObject = new window.google.maps.Map(containerRef.current, mapOptions);
        updateGoogleMapObject(googleMapsObject);
    }
};

export const updateMutatedMarkersGenerator = (
    markers: MapMarkerType[],
    map: google.maps.Map,
    parentRef: RefObject<HTMLElement>,
    updateMutatedMarkers: (markers: JSX.Element[]) => void,
): () => void => (): void => {
    if (map && markers && markers.length) {
        const mutatedMarkers: JSX.Element[] = [];
        const limits: LatLngLimitsType = {
            lat: { min: null, max: null },
            lng: { min: null, max: null },
        };

        markers.forEach(
            (marker: MapMarkerType): void => {
                if (!limits.lat.min || marker.latLng[0] < limits.lat.min) limits.lat.min = marker.latLng[0];
                if (!limits.lat.max || marker.latLng[0] > limits.lat.max) limits.lat.max = marker.latLng[0];
                if (!limits.lng.min || marker.latLng[1] < limits.lng.min) limits.lng.min = marker.latLng[1];
                if (!limits.lng.max || marker.latLng[1] > limits.lng.max) limits.lng.max = marker.latLng[1];

                mutatedMarkers.push(
                    <ComponentMarker
                        latLng={marker.latLng}
                        map={map}
                        parentRef={parentRef}
                        key={marker.key}
                    >
                        { marker.component }
                    </ComponentMarker>,
                );
            },
        );

        map.fitBounds(
            new google.maps.LatLngBounds(
                new google.maps.LatLng(limits.lat.max, limits.lng.min),
                new google.maps.LatLng(limits.lat.min, limits.lng.max),
            ),
        );
        google.maps.event.addListenerOnce(
            map,
            'idle',
            (): void => {
                updateMutatedMarkers(mutatedMarkers);
            },
        );
    }
};
