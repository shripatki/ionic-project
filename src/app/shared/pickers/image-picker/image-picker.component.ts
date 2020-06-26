import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Plugins,Camera, Capacitor, CameraResultType, CameraSource } from "@capacitor/core";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker',{static:false}) filePickerRef:ElementRef<HTMLInputElement>
  @Output() imagePick = new EventEmitter<string | File>();

  selectedImage:string;
  usePicker:boolean;
  constructor(private platForm:Platform) { }

  ngOnInit() {
    if((this.platForm.is('mobile') && !this.platForm.is('hybrid')) || this.platForm.is('desktop')){
      this.usePicker = true;
    }
  }

  onPickImage(){
    if(!Capacitor.isPluginAvailable('Camera') || this.usePicker){
      this.filePickerRef.nativeElement.click();
      return;
    }

    Plugins.Camera.getPhoto({
      quality: 50,
      source:CameraSource.Prompt,
      correctOrientation:true,
      height:320,
      width:200,
      resultType:CameraResultType.Base64
    }).then(image=>{
      this.selectedImage = image.base64String;
      this.imagePick.emit(image.base64String)
    }).catch(err=>{
      return false;
    })

  }

  onFileChosen(event:Event){
    console.log(event);
    const pickedImage= (event.target as HTMLInputElement).files[0];
    if(!pickedImage){
      return
    }
    const fr = new FileReader();
    fr.onload = ()=>{
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePick.emit(pickedImage);
    };
    fr.readAsDataURL(pickedImage);
  }

}
