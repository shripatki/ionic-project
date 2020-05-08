import { Injectable } from "@angular/core";
import { Place } from "./place.model";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  
  private _places: Place[]=[
    new Place(
    'p1',
    'Hyatt Regency Pune & Residences',
    'Weikfield IT Park, Pune Nagar Road, Pune, Maharashtra 411014•020 6645 1234',
    'https://pix6.agoda.net/hotelImages/297839/-1/0382e44b43964ca61d32aee6df4b9d28.jpg?s=1024x768',
    8000
    ),
    new Place(
    'p2',
    'The O Hotel',
    'Plot No, 293, N Main Rd, Vaswani Nagar, Ragvilas Society, Koregaon Park, Pune, Maharashtra 411001•020 4001 1000',
    'https://pix6.agoda.net/hotelImages/10558276/0/2b0a2168a814484ad4a4c3bf7fc9e3bd.jpg?s=450x450',
    5400
    ),
    new Place(
    'p3',
    'Sayaji Hotel',
    '135/136, Mumbai-Banglore Bypass Highway, Wakad, Pune, Maharashtra 411057•020 4212 1212',
    'https://lh3.googleusercontent.com/proxy/EtmaxOMgY5kmvs7Dl53djr3D_eQBNOuhZdmCwK1FfHQB-92pm71qEj5JpuJT7xbEF5J5p1uqnIXyCMPA7F4o3UaJ96yo90FE-8Kjj5d86UP0FUtvMvjDwClv_e7hlRelKQf9f_cwFLUhk5wSDNhKGznhAlqebQ=w296-h202-n-k-rw-no-v1',
    4500
    )
  ]
  constructor() {}

  getplaces():Place[]{
    return [...this._places];
  }

  getplace(placeId: string): Place {
    return {...this.getplaces().find(place=>{
      return place.id === placeId;
    })}
  }

  deletePlace(placeId:string){
    this._places = this._places.filter(place =>{
      return place.id != placeId;
    })
  }
}
