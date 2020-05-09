import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _bookings:Booking[]=[
    new Booking(
      'xyz','p1','abc','Hyatt Regency Pune & Residences',2
    )
  ]
  constructor() { }

  getBookings():Booking[]{
    return [...this._bookings];
  }

  getBooking(BookingId: string): Booking {
    return {...this.getBookings().find(Booking=>{
      return Booking.id === BookingId;
    })}
  }

  deleteBooking(bookingId:string){
    this._bookings = this._bookings.filter(booking =>{
      return booking.id != bookingId;
    })
  }
}
