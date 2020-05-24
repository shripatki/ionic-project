import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding, AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBooking:Booking[];
  bookingsubscription:Subscription;
  isLoading:boolean;
  constructor(private bookingService:BookingService,
    private alertController:AlertController,
    private loadingController:LoadingController) { }

  ngOnInit() {
    this.bookingsubscription = this.bookingService.bookings.subscribe(bookings=>{
      this.loadedBooking = bookings;
    });
  }

  ionViewWillEnter(){
    this.isLoading= true;
    this.bookingService.fetchBookings().subscribe(dt=>{
      this.isLoading = false;
    });
  }

  deleteOffer(bookingId:string, slidingItem:IonItemSliding){
    slidingItem.close();
    this.loadingController.create({
      message:'Deleting Booking...'
    }).then(loadingEle=>{
      loadingEle.present();
      this.bookingService.deleteBooking(bookingId).subscribe(data=>{
        loadingEle.dismiss();
    });
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.bookingsubscription){
    this.bookingsubscription.unsubscribe();
    }
  }

}
