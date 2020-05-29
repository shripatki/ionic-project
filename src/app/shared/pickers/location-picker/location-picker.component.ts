import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PlaceLocation, Coordinates } from 'src/app/places/location.model';
import { environment } from 'src/environments/environment';
import { Plugins,Capacitor } from "@capacitor/core";

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  @Output() locationPick = new EventEmitter<PlaceLocation>();
  selectedLocationImage:string;
  isLoading:boolean;
  constructor(private modalController:ModalController,
    private http:HttpClient,
    private actionSheetContoller:ActionSheetController,
    private alertController:AlertController) { }

  ngOnInit() {}

  onPickLocation(){
    this.actionSheetContoller.create({
      header:'Please Choose',
      buttons:[
        {
          text:'Auto-Locate',
          handler: ()=>{
            this.locateUser();
          }
        },
        {
          text:'Pick on Map',
          handler: ()=>{
            this.openMap()
          }
        },
        {
          text:'Cancel',
          role: 'cancel'
        }
      ]

    }).then(actionEle=>{
      actionEle.present();
    })
    //this.newMethod();
  }

  private locateUser(){
    if(!Capacitor.isPluginAvailable('Geolocation')){
      this.showErrorAlert();
      return;
    }
    Plugins.Geolocation.getCurrentPosition().then(geoPosition=>{
      const coordinates:Coordinates = {
        lat: geoPosition.coords.latitude,
        lng: geoPosition.coords.longitude
      };
      this.createPlace(coordinates);
    }).catch(err=>{
      this.showErrorAlert();
    })
  }


  private showErrorAlert() {
    this.alertController.create({
      header: 'Could not fetch Loaction',
      message: 'Please use map to pick location',
      buttons:['OK']
    }).then(alertele => {
      alertele.present();
    });
  }

  private openMap() {
    this.modalController.create({ component: MapModalComponent }).then(modalEle => {
      modalEle.onDidDismiss().then((modalData: any) => {
        console.log(modalData);
        if (!modalData.data) {
          return;
        }
        const coordinates:Coordinates ={
          lat: modalData.data.lat,
          lng: modalData.data.lng,
        }
        this.createPlace(coordinates);
      });
      modalEle.present();
    });
  }

  private createPlace( coordinates: Coordinates) {
    const pickedLocation: PlaceLocation = {
      lat: coordinates.lat,
      lng: coordinates.lng,
      address: null,
      staticImageUrl: null
    };
    this.isLoading = true;
    this.getAddress(coordinates).pipe(switchMap(add => {
      pickedLocation.address = add;
      return of(this.getMapImage(coordinates));
    })).subscribe(staticMapImage => {
      pickedLocation.staticImageUrl = staticMapImage;
      this.selectedLocationImage = staticMapImage;
      this.isLoading = false;
      this.locationPick.emit(pickedLocation);
    });
  }

  private getAddress(latlag){
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlag.lat},${latlag.lng}&key=${environment.G_API_KEY}`).pipe(
      map((geoData:any)=>{
        if(!geoData && !geoData.results && geoData.results.length <=0){
          return null
        }
        return geoData.results[0].formatted_address;
      })
    )
  }

  private getMapImage(mapData){
    return `https://maps.googleapis.com/maps/api/staticmap?center=${mapData.lat},${mapData.lng}&zoom=16&size=500x300&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${mapData.lat},${mapData.lng}
    &key=${environment.G_API_KEY}`
  }

}
