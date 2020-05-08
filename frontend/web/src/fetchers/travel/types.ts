export interface TravelLocalityResponseType {
    locality_id: number;
    name: string;
    country_code: string;
    latitude: number;
    longitude: number;
    gmaps_place_id: string;
}

export interface GetTravelLocalityResponseType {
    locality: TravelLocalityResponseType
}

export interface GetTravelLocalitiesResponseType {
    localities: TravelLocalityResponseType[]
}
