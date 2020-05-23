import { Injectable } from "@angular/core";
import { Booking } from "./booking.model";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { take, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);
  constructor(private authService: AuthService) {}

  get bookings() {
    return this._bookings.asObservable();
  }

  getBooking(BookingId: string) {
    /* return {...this.getBookings().find(Booking=>{
      return Booking.id === BookingId;
    })} */
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
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap((bookings: Booking[]) => {
        this._bookings.next(bookings.concat(newBooking));
      })
    );
  }

  deleteBooking(bookingId: string) {
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap((bookings: Booking[]) => {
        this._bookings.next(bookings.filter(booking=> booking.id !== bookingId));
      })
    );
  }
}
