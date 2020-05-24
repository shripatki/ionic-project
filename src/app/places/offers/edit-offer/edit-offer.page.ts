import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
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
  isLoading:boolean;
  placeId:string;
  
  constructor(private activatedRoute:ActivatedRoute,
    private placeService:PlacesService,
    private navController:NavController,
    private loadingContoller:LoadingController,
    private router:Router,
    private alertController:AlertController
    ) { }

    ngOnInit() {
      this.activatedRoute.paramMap.subscribe(paramMap=>{
        if(!paramMap.get("placeId")){
          this.navController.navigateBack('/places/tabs/offers')
          return 
        }
        this.isLoading = true;
        this.placeId = paramMap.get("placeId");
        this.placeSub = this.placeService.getplace(paramMap.get("placeId")).subscribe(place=>{
          this.place = place;
        
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
        });
        this.isLoading = false;
      },error=>{
        this.alertController.create({
          header:'An error occured',
          message:'Place could not be fetched,Please try aging later',
          buttons:[
            {
              text:'Ok',
              handler:()=>{
                this.router.navigateByUrl('/places/tabs/offers')
              }
            }
          ]
        }).then(alertEle=>{
          alertEle.present();
        })
      });
      });
    }

    onEditOffer(){
      if(!this.form.valid){
        return;
      }
      this.loadingContoller.create({message:'Updating Place...'}).then(
        loadingEle =>{
          loadingEle.present();
          this.placeService.updatePlace(this.place.id,this.form.value.title,this.form.value.description).subscribe(data=>{
            loadingEle.dismiss();
            this.form.reset();
            this.router.navigate(['/places/tabs/offers']);
          })
        }
      )
      
      
    }

    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      if(this.placeSub){
  
        this.placeSub.unsubscribe()
      }
    }

}
