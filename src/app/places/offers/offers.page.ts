import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { NavController, IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  offers:Place[];
  placesSubscription: Subscription;
  constructor(
    private placesService:PlacesService,
    private navController:NavController
    ) { }

  ngOnInit() {
    this.placesSubscription=  this.placesService.places.subscribe(places=>{
      this.offers = places;
    });
  }

  onEdit(placeId:string,slidingItem:IonItemSliding){
    slidingItem.close();
    this.navController.navigateForward(['/places/tabs/offers/edit/',placeId])
  }

  ngOnDestroy(): void {
    if(this.placesSubscription){
      this.placesSubscription.unsubscribe();
    }
    
  }

}
