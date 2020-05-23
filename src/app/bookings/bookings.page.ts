import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBooking:Booking[];
  bookingsubscription:Subscription;
  constructor(private bookingService:BookingService,
    private alertController:AlertController) { }

  ngOnInit() {
    this.bookingsubscription = this.bookingService.bookings.subscribe(bookings=>{
      this.loadedBooking = bookings;
    });
  }

  deleteOffer(bookingId:string, slidingItem:IonItemSliding){
    slidingItem.close();
    
    //this.bookingService.deleteBooking(bookingId);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.bookingsubscription){
    this.bookingsubscription.unsubscribe();
    }
  }

}
