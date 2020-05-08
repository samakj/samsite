export interface MapPropsType {
    zoom?: google.maps.MapOptions["zoom"],
    center?: google.maps.MapOptions["center"],
    disableDefaultUI?: google.maps.MapOptions["disableDefaultUI"],
    backgroundColor?: google.maps.MapOptions["backgroundColor"],
    mapStyles?: google.maps.MapOptions["styles"],
    bounds?: [LatLngObjectType, LatLngObjectType],
}

export interface LatLngObjectType {
    lat: number;
    lng: number;
}
