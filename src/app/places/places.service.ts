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
    'https://lh3.googleusercontent.com/p/AF1QipNde2iNxuV2VYJw94o6GfOSPYJLdaVxePteiy5i=w296-h202-n-k-rw-no-v1',
    8000
    ),
    new Place(
    'p2',
    'The O Hotel',
    'Plot No, 293, N Main Rd, Vaswani Nagar, Ragvilas Society, Koregaon Park, Pune, Maharashtra 411001•020 4001 1000',
    'https://lh3.googleusercontent.com/p/AF1QipNsKgHJUJS-jme_IA9TnI1rizdyFebvArsuNXWg=w296-h202-n-k-rw-no-v1',
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
