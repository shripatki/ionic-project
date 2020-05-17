import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBooking:Booking[];
  constructor(private bookingService:BookingService,
    private alertController:AlertController) { }

  ngOnInit() {
    this.loadedBooking = this.bookingService.getBookings();
  }

  deleteOffer(bookingId:string, slidingItem:IonItemSliding){
    slidingItem.close();
    
    //this.bookingService.deleteBooking(bookingId);
  }


}
