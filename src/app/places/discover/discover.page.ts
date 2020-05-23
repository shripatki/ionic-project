import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail} from '@ionic/core'
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { from, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces:Place[];
  listOfloadedPlaces:Place[];
  releventPlaces:Place[];
  placesSubscription: Subscription;
  isloading:boolean;

  constructor(private placesService:PlacesService,
    private authService:AuthService
    ) { }

  ngOnInit() {
    this.placesSubscription=  this.placesService.places.subscribe(places=>{
      this.loadedPlaces = places;
      this.releventPlaces = [...places]
      this.listOfloadedPlaces = this.loadedPlaces.slice(1);
    });
  }

  ionViewWillEnter(){
    this.isloading= true;
    this.placesService.fetchPlaces().subscribe(data=>{
      this.isloading = false;
    });

  }

  onFilterUpdate(event:CustomEvent<SegmentChangeEventDetail>){
    if(event.detail.value === 'all'){
      this.releventPlaces = this.loadedPlaces;
    }else{
      this.releventPlaces = this.loadedPlaces.filter(place => place.userId == this.authService.userId);
    }
    this.listOfloadedPlaces = this.releventPlaces.slice(1);

    console.log(event.detail);
  }

  ngOnDestroy(): void {
    if(this.placesSubscription){
      this.placesSubscription.unsubscribe();
    }
    
  }
  
}
