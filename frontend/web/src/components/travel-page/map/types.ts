import { StateObjectType } from '@samsite/store/types';
import { TravelCountryStateType } from '@samsite/store/handlers/travel/types';

export interface MapPropsType {
    zoom?: google.maps.MapOptions["zoom"];
    center?: google.maps.MapOptions["center"];
    disableDefaultUI?: google.maps.MapOptions["disableDefaultUI"];
    backgroundColor?: google.maps.MapOptions["backgroundColor"];
    mapStyles?: google.maps.MapOptions["styles"];
    countries?: StateObjectType<TravelCountryStateType>;
    markers?: MapMarkerType[];
}

export interface MapMarkerType {
    latLng: [number, number];
    component: JSX.Element;
    key: string | number;
}

export interface LatLngObjectType {
    lat: number;
    lng: number;
}

export interface LatLngLimitsType {
    lat: { min: number, max: number },
    lng: { min: number, max: number },
}
