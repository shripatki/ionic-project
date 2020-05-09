import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place:Place;
  constructor(private router:ActivatedRoute,
    private placeService:PlacesService,
    private navController:NavController) { }

    ngOnInit() {
      this.router.paramMap.subscribe(paramMap=>{
        if(!paramMap.get("placeId")){
          this.navController.navigateBack('/places/tabs/offers')
          return 
        }
        this.place = this.placeService.getplace(paramMap.get("placeId"))   
      })
    }

}
