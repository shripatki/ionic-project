import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  place:Place;
  private placeSub:Subscription;

  constructor(private router:ActivatedRoute,
    private navController:NavController,
    private placeService:PlacesService) { }

  ngOnInit() {
    this.router.paramMap.subscribe(paramMap=>{
      if(paramMap.has('placeId')){
        this.navController.navigateBack('/places/tabs/offers')
      }
      this.placeSub = this.placeService.getplace(paramMap.get("placeId")).subscribe(place=>{
        this.place = place;
      })  
    })
  }

  onAvailOffer(){
    //this.router.navigateByUrl('/places/tabs/discover');
   this.navController.navigateBack('/places/tabs/offers');
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.placeSub){

      this.placeSub.unsubscribe()
    }
  }
}
