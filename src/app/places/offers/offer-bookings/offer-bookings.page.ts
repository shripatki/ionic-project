import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  constructor(private router:Router,
    private navController:NavController) { }

  ngOnInit() {
  }

  onAvailOffer(){
    //this.router.navigateByUrl('/places/tabs/discover');
   this.navController.navigateBack('/places/tabs/offers');
  }
}
