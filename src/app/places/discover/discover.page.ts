import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces:Place[];
  listOfloadedPlaces:Place[];
  constructor(private placesService:PlacesService,
    ) { }

  ngOnInit() {
    this.loadedPlaces = this.placesService.getplaces();
    this.listOfloadedPlaces = this.loadedPlaces.slice(1);
  }

  
}
