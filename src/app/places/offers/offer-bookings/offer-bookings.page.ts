import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  place:Place;


  constructor(private router:ActivatedRoute,
    private navController:NavController,
    private placeService:PlacesService) { }

  ngOnInit() {
    this.router.paramMap.subscribe(paramMap=>{
      this.place = this.placeService.getplace(paramMap.get("placeId"))   
    })
  }

  onAvailOffer(){
    //this.router.navigateByUrl('/places/tabs/discover');
   this.navController.navigateBack('/places/tabs/offers');
  }
}
