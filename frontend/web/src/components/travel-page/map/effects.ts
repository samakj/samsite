import Map = google.maps.Map;
import { RefObject } from 'react';
import { LatLngObjectType } from '@samsite/components/travel-page/map/types';

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

export const initGoogleMapObject = (
    containerRef: RefObject<HTMLDivElement>,
    initialBounds: [LatLngObjectType, LatLngObjectType],
    mapOptions: google.maps.MapOptions,
    scriptLoaded: boolean,
    updateGoogleMapObject: (value: Map) => void,
): () => void => (): void => {
    if (scriptLoaded) {
        const googleMapsObject = new window.google.maps.Map(containerRef.current, mapOptions);

        const bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(initialBounds[0].lat, initialBounds[0].lng),
            new google.maps.LatLng(initialBounds[1].lat, initialBounds[1].lng),
        );

        googleMapsObject.fitBounds(bounds);
        updateGoogleMapObject(googleMapsObject);
    }
};
