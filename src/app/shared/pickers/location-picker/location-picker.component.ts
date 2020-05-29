import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PlaceLocation } from 'src/app/places/location.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  @Output() locationPick = new EventEmitter<PlaceLocation>();
  selectedLocationImage:string;
  isLoading:boolean;
  constructor(private modalController:ModalController,private http:HttpClient) { }

  ngOnInit() {}

  onPickLocation(){
    this.modalController.create({component:MapModalComponent}).then(modalEle=>{
      modalEle.onDidDismiss().then((modalData:any)=>{
        console.log(modalData);
        if(!modalData.data){
          return ;
        }
        const pickedLocation:PlaceLocation={
          lat:modalData.data.lat,
          lng:modalData.data.lng,
          address:null,
          staticImageUrl:null
        }
        this.isLoading = true;
        this.getAddress(modalData.data).pipe(
          switchMap(add=>{
            pickedLocation.address = add;
            return of(this.getMapImage(modalData.data))
          })).subscribe(staticMapImage=>{
          pickedLocation.staticImageUrl = staticMapImage;
          this.selectedLocationImage = staticMapImage;
          this.isLoading = false;
          this.locationPick.emit(pickedLocation);
        });
      })
      modalEle.present();
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
