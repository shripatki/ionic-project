import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationPickerComponent } from "./pickers/location-picker/location-picker.component";
import { MapModalComponent } from "./pickers/map-modal/map-modal.component";

@NgModule({
  declarations: [LocationPickerComponent, MapModalComponent],
  imports: [CommonModule],
  exports: [LocationPickerComponent, MapModalComponent],
  entryComponents: [MapModalComponent],
})
export class SharedModule {}
