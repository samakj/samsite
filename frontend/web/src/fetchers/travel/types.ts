export interface TravelCountryResponseType {
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    region: string;
    subregion: string;
    population: number;
    latlng: [number, number];
    demonym: string;
    area: number;
    gini: number;
    timezones: string[];
    borders: string[];
    nativeName: string;
    numericCode: number;
    currencies: {
        code: string;
        name: string;
        symbol: string;
    }[];
    languages: {
        iso639_1: string;
        iso639_2: string;
        name: string;
        nativeName: string;
    }[];
    translations: { [iso639: string]: string };
    flag: string;
    regionalBlocs: {
        acronym: string;
        name: string;
        otherAcronyms: string[];
        otherNames: string[];
    }[];
    cioc: string;
}

export interface TravelLocalityResponseType {
    locality_id: number;
    name: string;
    country_code: string;
    latitude: string;
    longitude: string;
    gmaps_place_id: string;
}

export interface GetTravelLocalityResponseType {
    locality: TravelLocalityResponseType
}

export interface GetTravelLocalitiesResponseType {
    localities: TravelLocalityResponseType[]
}
