import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail} from '@ionic/core'
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { from, Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces:Place[];
  listOfloadedPlaces:Place[];
  placesSubscription: Subscription;

  constructor(private placesService:PlacesService,
    ) { }

  ngOnInit() {
    this.placesSubscription=  this.placesService.places.subscribe(places=>{
      this.loadedPlaces = places;
      this.listOfloadedPlaces = this.loadedPlaces.slice(1);
    });
  }

  onFilterUpdate(event:CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
  }

  ngOnDestroy(): void {
    if(this.placesSubscription){
      this.placesSubscription.unsubscribe();
    }
    
  }
  
}
