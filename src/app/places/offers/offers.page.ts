import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { NavController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  offers:Place[];
  constructor(
    private placesService:PlacesService,
    private navController:NavController
    ) { }

  ngOnInit() {
    this.offers = this.placesService.getplaces();
  }

  onEdit(placeId:string,slidingItem:IonItemSliding){
    slidingItem.close();
    this.navController.navigateForward(['/places/tabs/offers/edit/',placeId])
  }

}
