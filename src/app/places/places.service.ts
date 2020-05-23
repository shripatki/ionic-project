import { Injectable } from "@angular/core";
import { Place } from "./place.model";
import { AuthService } from "../auth/auth.service";
import { BehaviorSubject } from "rxjs";
import { take, map, tap, delay, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  genaratedId:string;
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      "p1",
      "Hyatt Regency Pune & Residences",
      "Weikfield IT Park, Pune Nagar Road, Pune, Maharashtra 411014•020 6645 1234",
      "https://pix6.agoda.net/hotelImages/297839/-1/0382e44b43964ca61d32aee6df4b9d28.jpg?s=1024x768",
      8000,
      new Date("2019-01-01"),
      new Date("2019-12-31"),
      "abc"
    ),
    new Place(
      "p2",
      "The O Hotel",
      "Plot No, 293, N Main Rd, Vaswani Nagar, Ragvilas Society, Koregaon Park, Pune, Maharashtra 411001•020 4001 1000",
      "https://pix6.agoda.net/hotelImages/10558276/0/2b0a2168a814484ad4a4c3bf7fc9e3bd.jpg?s=450x450",
      5400,
      new Date("2019-01-01"),
      new Date("2019-12-31"),
      "abc"
    ),
    new Place(
      "p3",
      "Sayaji Hotel",
      "135/136, Mumbai-Banglore Bypass Highway, Wakad, Pune, Maharashtra 411057•020 4212 1212",
      "https://lh3.googleusercontent.com/proxy/EtmaxOMgY5kmvs7Dl53djr3D_eQBNOuhZdmCwK1FfHQB-92pm71qEj5JpuJT7xbEF5J5p1uqnIXyCMPA7F4o3UaJ96yo90FE-8Kjj5d86UP0FUtvMvjDwClv_e7hlRelKQf9f_cwFLUhk5wSDNhKGznhAlqebQ=w296-h202-n-k-rw-no-v1",
      4500,
      new Date("2019-01-01"),
      new Date("2019-12-31"),
      "xyz"
    ),
  ]);
  constructor(private authService: AuthService, private http: HttpClient) {}

  get places() {
    return this._places.asObservable();
  }

  getplace(placeId: string) {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((place) => place.id == placeId) };
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      "https://pix6.agoda.net/hotelImages/297839/-1/0382e44b43964ca61d32aee6df4b9d28.jpg?s=1024x768",
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    return this.http
      .post<{ name: string }>(
        "https://ionic-hotel-booking-6722e.firebaseio.com/offer-places.json",
        { ...newPlace, id: null }
      )
      .pipe(
        switchMap(resData=>{
          this.genaratedId = resData.name;
          return this.places
        }),
        take(1),
        tap(places=>{
          newPlace.id = this.genaratedId;
          this._places.next(places.concat(newPlace));
        })
      );
    /* return this.places.pipe(
      take(1),
      delay(1000),
      tap((places: Place[]) => {
      })
    ); */

    console.log(this._places);
  }
  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places: Place[]) => {
        const placeIndex = places.findIndex((place) => place.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[placeIndex];
        updatedPlaces[placeIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );

    console.log(this._places);
  }

  deletePlace(placeId: string) {
    /*  this._places = this._places.filter(place =>{
      return place.id != placeId;
    }) */
  }
}
