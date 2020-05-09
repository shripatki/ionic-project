import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place:Place;
  constructor(private router:ActivatedRoute,
    private navController:NavController,
    private placeService:PlacesService,
    private modalController:ModalController,
    private actionSheetController:ActionSheetController) { }

    ngOnInit() {
      this.router.paramMap.subscribe(paramMap=>{
        if(!paramMap.get("placeId")){
          this.navController.navigateBack('/places/tabs/discover')
        }
        this.place = this.placeService.getplace(paramMap.get("placeId"))   
      })
    }

  onBookPlace(){
    //this.router.navigateByUrl('/places/tabs/discover');
  // this.navController.navigateBack('/places/tabs/discover');
  this.actionSheetController.create({
    header:'Choose a Action',
    buttons:[
      {
        text:'Select Date',
        handler:()=>{
          this.openBookingModal('select')
        }

      },
      {
        text:'Random Date',
        handler:()=>{
          this.openBookingModal('random')
        }
      },
      {
        text:'Cancel',
        role:'cancel'
      }
    ]
  }).then(actionSheetEl=>{
    actionSheetEl.present();
  })
 
  }

  openBookingModal(mode: 'select'|'random'){
    console.log(mode);
    this.modalController.create({
      component: CreateBookingComponent,
      componentProps: {
        selectedPlace: this.place
      }
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData =>{
      console.log(resultData);
    })
  }

}
