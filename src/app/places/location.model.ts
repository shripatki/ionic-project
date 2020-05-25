export interface Coordinates{
    lat:string;
    lng:string;
}

export interface PlaceLocation extends Coordinates {
    address:string;
    staticImageUrl:string;
}