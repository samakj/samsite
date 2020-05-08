export interface TravelCountryStateType {
    countryCode: string;
    name: string;
    nativeName: string;
    capital: string;
    flag: string;
    region: string;
    subregion: string;
    latitude: number;
    longitude: number;
}

export interface TravelLocalityStateType {
    localityId: number;
    name: string;
    countryCode: string;
    latitude: number;
    longitude: number;
    gmapsPlaceId: string;
}
