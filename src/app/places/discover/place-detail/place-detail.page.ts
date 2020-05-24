import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController,
} from "@ionic/angular";
import { PlacesService } from "../../places.service";
import { Place } from "../../place.model";
import { CreateBookingComponent } from "../../../bookings/create-booking/create-booking.component";
import { Subscription } from "rxjs";
import { BookingService } from "src/app/bookings/booking.service";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-place-detail",
  templateUrl: "./place-detail.page.html",
  styleUrls: ["./place-detail.page.scss"],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  private placeSub: Subscription;
  isBookable:boolean;
  isLoading:boolean;
  constructor(
    private router: ActivatedRoute,
    private navController: NavController,
    private placeService: PlacesService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private bookingServiice: BookingService,
    private loadingController:LoadingController,
    private authService:AuthService
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe((paramMap) => {
      if (!paramMap.get("placeId")) {
        this.navController.navigateBack("/places/tabs/discover");
      }
      this.isLoading = true;
      this.placeSub = this.placeService
        .getplace(paramMap.get("placeId"))
        .subscribe((place) => {
          this.place = place;
          this.isLoading = false;
          this.isBookable = place.userId == this.authService.userId
        });
    });
  }

  onBookPlace() {
    //this.router.navigateByUrl('/places/tabs/discover');
    // this.navController.navigateBack('/places/tabs/discover');
    this.actionSheetController
      .create({
        header: "Choose a Action",
        buttons: [
          {
            text: "Select Date",
            handler: () => {
              this.openBookingModal("select");
            },
          },
          {
            text: "Random Date",
            handler: () => {
              this.openBookingModal("random");
            },
          },
          {
            text: "Cancel",
            role: "cancel",
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  openBookingModal(mode: "select" | "random") {
    console.log(mode);
    this.modalController
      .create({
        component: CreateBookingComponent,
        componentProps: {
          selectedPlace: this.place,
          selectedMode: mode,
        },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === "confirm") {
          this.loadingController.create({
            message:'creting booking...'
          }).then(loadingele=>{
            loadingele.present();
            const data = resultData.data.bookingData;
          this.bookingServiice.addBooking(
            this.place.id,
            this.place.title,
            this.place.imageUrl,
            data.firstName,
            data.lastName,
            data.guestNumber,
            data.startDate,
            data.endDate
          ).subscribe(dt=>{
            loadingele.dismiss();
          });
          })
          
          console.log("BOOKED!");
        }
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
