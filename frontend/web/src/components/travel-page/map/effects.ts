import Map = google.maps.Map;
import { RefObject } from 'react';
import { LatLngObjectType } from '@samsite/components/travel-page/map/types';
import { StateObjectType } from '@samsite/store/types';
import { TravelCountryStateType } from '@samsite/store/handlers/travel/types';

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

export const createMapMarkersGenerator = (
    googleMapObject: google.maps.Map,
    countries: StateObjectType<TravelCountryStateType>,
    updateMarkers: (markers: google.maps.Marker[]) => void,
): () => void => (): void => {
    if (googleMapObject && countries && Object.keys(countries).length) {
        const markers = Object.values(countries).map(
            (country: TravelCountryStateType): google.maps.Marker => {
                return new google.maps.Marker({
                    map: googleMapObject,
                    position: new google.maps.LatLng(country.latitude, country.longitude),
                    title: `${country.nativeName}${country.name === country.nativeName ? '' : ` (${country.name})`}`,
                    icon: {
                        url: country.flag,
                        scaledSize: new google.maps.Size(32, 32),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(16, 16),
                    },
                    animation: google.maps.Animation.DROP,
                });
            }
        );
        updateMarkers(markers)
    }
};
