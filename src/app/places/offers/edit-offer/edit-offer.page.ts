import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place:Place;
  form:FormGroup;
  placeSub: Subscription;
  constructor(private router:ActivatedRoute,
    private placeService:PlacesService,
    private navController:NavController) { }

    ngOnInit() {
      this.router.paramMap.subscribe(paramMap=>{
        if(!paramMap.get("placeId")){
          this.navController.navigateBack('/places/tabs/offers')
          return 
        }
        this.placeSub = this.placeService.getplace(paramMap.get("placeId")).subscribe(place=>{
          this.place = place;
        })
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

    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      if(this.placeSub){
  
        this.placeSub.unsubscribe()
      }
    }

}
