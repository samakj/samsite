import { RefObject } from 'react';

export interface ComponentMarkerPropsType {
    latLng: [number, number];
    map?: google.maps.Map;
    parentRef: RefObject<HTMLElement>;
}
