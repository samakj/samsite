import { StateObjectType } from '@samsite/store/types';
import { TravelCountryStateType } from '@samsite/store/handlers/travel/types';

export interface MapPropsType {
    zoom?: google.maps.MapOptions["zoom"];
    center?: google.maps.MapOptions["center"];
    disableDefaultUI?: google.maps.MapOptions["disableDefaultUI"];
    backgroundColor?: google.maps.MapOptions["backgroundColor"];
    mapStyles?: google.maps.MapOptions["styles"];
    bounds?: [LatLngObjectType, LatLngObjectType];
    countries?: StateObjectType<TravelCountryStateType>;
    markers?: MapMarkerType[];
}

export interface MapMarkerType {
    latLng: [number, number];
    component: JSX.Element;
    key: string;
}

export interface LatLngObjectType {
    lat: number;
    lng: number;
}
