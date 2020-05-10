import { StateObjectType } from '@samsite/store/types';
import { TravelCountryStateType } from '@samsite/store/handlers/travel/types';

export interface MapPropsType {
    zoom?: google.maps.MapOptions["zoom"],
    center?: google.maps.MapOptions["center"],
    disableDefaultUI?: google.maps.MapOptions["disableDefaultUI"],
    backgroundColor?: google.maps.MapOptions["backgroundColor"],
    mapStyles?: google.maps.MapOptions["styles"],
    bounds?: [LatLngObjectType, LatLngObjectType],
    countries?: StateObjectType<TravelCountryStateType>
}

export interface LatLngObjectType {
    lat: number;
    lng: number;
}
