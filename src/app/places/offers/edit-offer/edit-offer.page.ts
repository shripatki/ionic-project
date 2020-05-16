import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place:Place;
  form:FormGroup;
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
        this.form = new FormGroup({
          title:new FormControl(this.place.title,{
            updateOn:'blur',
            validators:[Validators.required]
          }
        ),
        description:new FormControl( this.place.description,{
            updateOn:'blur',
            validators:[Validators.required, Validators.maxLength(180)]
          }
        )
        })
      })
    }

    onEditOffer(){
      
    }

}
