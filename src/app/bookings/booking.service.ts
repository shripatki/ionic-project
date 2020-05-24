import { Injectable } from "@angular/core";
import { Booking } from "./booking.model";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { take, delay, tap, switchMap, map } from 'rxjs/operators';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);
  genaratedId:string;
  constructor(private authService: AuthService,
    private http:HttpClient) {}

  get bookings() {
    return this._bookings.asObservable();
  }

  getBooking(BookingId: string) {
    /* return {...this.getBookings().find(Booking=>{
      return Booking.id === BookingId;
    })} */
  }

  fetchBookings() {
    return this.http
      .get<{ [key: string]: any }>(
        `https://ionic-hotel-booking-6722e.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`
      )
      .pipe(
        map((resdata) => {
          const bookings = [];
          for (const key in resdata) {
            if (resdata.hasOwnProperty(key)) {
              bookings.push(
                new Booking(
                  key,
                  resdata[key].placeId,
                  resdata[key].userId,
                  resdata[key].placeTitle,
                  resdata[key].placeImage,
                  resdata[key].firstName,
                  resdata[key].lastName,
                  resdata[key].guestNumber,
                  new Date(resdata[key].bookedFrom),
                  new Date(resdata[key].bookedTo)
                )
              );
            }
          }
          return bookings;
        }),
        tap((bookings) => {
          this._bookings.next(bookings);
        })
      );
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    noOfGuest: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      noOfGuest,
      dateFrom,
      dateTo
    );
    return this.http
    .post<{ name: string }>(
      "https://ionic-hotel-booking-6722e.firebaseio.com/bookings.json",
      { ...newBooking, id: null }
    )
    .pipe(
      switchMap((resData) => {
        this.genaratedId = resData.name;
        return this.bookings;
      }),
      take(1),
      tap((bookings) => {
        newBooking.id = this.genaratedId;
        this._bookings.next(bookings.concat(newBooking));
      })
    );
  }

  deleteBooking(bookingId: string) {
    return this.http.delete(`https://ionic-hotel-booking-6722e.firebaseio.com/bookings/${bookingId}.json`).pipe(
      switchMap(()=>{
        return this.bookings;
      }),
      take(1),
      tap(
        bookings=>{
          this._bookings.next(bookings.filter(booking=> booking.id !== bookingId));
          
        }
      )
    )
   
  }
}
