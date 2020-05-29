import { Injectable } from "@angular/core";
import { Place } from "./place.model";
import { AuthService } from "../auth/auth.service";
import { BehaviorSubject, of } from "rxjs";
import { take, map, tap, delay, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { PlaceLocation } from './location.model';

interface PlaceData {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  availableFrom: string;
  availableTo: string;
  userId: string;
  location:PlaceLocation;
}
@Injectable({
  providedIn: "root",
})
export class PlacesService {
  genaratedId: string;
  private _places = new BehaviorSubject<Place[]>([]);
  constructor(private authService: AuthService, private http: HttpClient) {}

  get places() {
    return this._places.asObservable();
  }

  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>(
        "https://ionic-hotel-booking-6722e.firebaseio.com/offer-places.json"
      )
      .pipe(
        map((resdata) => {
          const places = [];
          for (const key in resdata) {
            if (resdata.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  resdata[key].title,
                  resdata[key].description,
                  resdata[key].imageUrl,
                  resdata[key].price,
                  new Date(resdata[key].availableFrom),
                  new Date(resdata[key].availableTo),
                  resdata[key].userId,
                  resdata[key].location
                )
              );
            }
          }
          return places;
        }),
        tap((places) => {
          this._places.next(places);
        })
      );
  }

  getplace(placeId: string) {
    return this.http
      .get<PlaceData>(
        `https://ionic-hotel-booking-6722e.firebaseio.com/offer-places/${placeId}.json`
      )
      .pipe(
        map((placeData) => {
          return new Place(
            placeId,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.userId,
            placeData.location
          );
        })
      );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date,
    location:PlaceLocation
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      "https://pix6.agoda.net/hotelImages/297839/-1/0382e44b43964ca61d32aee6df4b9d28.jpg?s=1024x768",
      price,
      dateFrom,
      dateTo,
      this.authService.userId,
      location
    );
    return this.http
      .post<{ name: string }>(
        "https://ionic-hotel-booking-6722e.firebaseio.com/offer-places.json",
        { ...newPlace, id: null }
      )
      .pipe(
        switchMap((resData) => {
          this.genaratedId = resData.name;
          return this.places;
        }),
        take(1),
        tap((places) => {
          newPlace.id = this.genaratedId;
          this._places.next(places.concat(newPlace));
        })
      );
  }
  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[] = [];
    return this.places.pipe(
      take(1),
      switchMap((places) => {
        if(!places || places.length <= 0){
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places=>{
        const placeIndex = places.findIndex((place) => place.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[placeIndex];
        updatedPlaces[placeIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId,
          oldPlace.location
        );
        return this.http.put(
          `https://ionic-hotel-booking-6722e.firebaseio.com/offer-places/${placeId}.json`,
          { ...updatedPlaces[placeIndex], id: null }
        );
      }),
      tap(() => {
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
