import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PlacesService } from "../../places.service";
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PlaceLocation } from '../../location.model';

@Component({
  selector: "app-new-offers",
  templateUrl: "./new-offers.page.html",
  styleUrls: ["./new-offers.page.scss"],
})
export class NewOffersPage implements OnInit {
  form: FormGroup;

  constructor(private placeService: PlacesService,
    private router:Router,
    private loadingController:LoadingController) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.maxLength(180)],
      }),
      price: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.min(1)],
      }),
      dateFrom: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      dateTo: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      location: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
    });
  }

  onCreateOffer() {
    console.log(this.form);
    this.loadingController.create({
      message:'Creating Place...'
    }).then(loadingEle =>{
      loadingEle.present();
      this.placeService.addPlace(
        this.form.value.title,
        this.form.value.description,
        +this.form.value.price,
        new Date(this.form.value.dateFrom),
        new Date(this.form.value.dateTo),
        this.form.value.location
      ).subscribe(()=>{
        loadingEle.dismiss();
        this.form.reset();
        this.router.navigate(['/places/tabs/offers']);
      });
    })
  }

  onLocationPicked(location:PlaceLocation){
    this.form.patchValue({location: location});
  }
}
