import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PlacesService } from "../../places.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { PlaceLocation } from "../../location.model";

function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: "app-new-offers",
  templateUrl: "./new-offers.page.html",
  styleUrls: ["./new-offers.page.scss"],
})
export class NewOffersPage implements OnInit {
  form: FormGroup;

  constructor(
    private placeService: PlacesService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

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
      image: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      })
    });
  }

  onCreateOffer() {
    console.log(this.form);
    if( !this.form.valid || !this.form.get('image').value){
      return
    }
    this.loadingController
      .create({
        message: "Creating Place...",
      })
      .then((loadingEle) => {
        loadingEle.present();
        this.placeService
          .addPlace(
            this.form.value.title,
            this.form.value.description,
            +this.form.value.price,
            new Date(this.form.value.dateFrom),
            new Date(this.form.value.dateTo),
            this.form.value.location
          )
          .subscribe(() => {
            loadingEle.dismiss();
            this.form.reset();
            this.router.navigate(["/places/tabs/offers"]);
          });
      });
  }

  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ location: location });
  }

  onImagePicked(imageData: string | File) {
    let imageFile:any;
    if (typeof imageData === "string") {
      try {
       imageFile = base64toBlob(
          imageData.replace("data:image/jpeg;base64,", ""),
          "image/jpeg"
        );
      } catch (err) {}
    } else {
      imageFile=imageData;
    }
    this.form.patchValue({image:imageFile})
    console.log(imageData);
  }
}
