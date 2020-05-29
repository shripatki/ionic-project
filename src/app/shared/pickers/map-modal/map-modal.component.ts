import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit,AfterViewInit {
  @ViewChild('map',{static:true}) mapElement:ElementRef;
  @Input() center= {
    lat:18.5204,lng:73.8567
  };
  @Input() selectable:boolean=true;
  @Input() closeButtonText:string= "Cancel";
  @Input() title = "Pick Location"
  clickListener: any;
  googleMap:any;
  constructor(private modalController:ModalController,private renderer:Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.getGoogleMap().then(googleMaps=>{
      console.log(googleMaps);
      this.googleMap = googleMaps;
      const mapEl = this.mapElement.nativeElement;
      const map = new googleMaps.Map(mapEl,{
        center: this.center,
        zoom:16
      });
      googleMaps.event.addListenerOnce(map,'idle',()=>{
        this.renderer.addClass(mapEl,'visible',)
      });
      if(this.selectable){
        this.clickListener = map.addListener('click',event=>{
          const selectedCord = {
            lat:event.latLng.lat(),
            lng:event.latLng.lng(),
          };
  
          this.modalController.dismiss(selectedCord);
        })
      }else{
        const marker = new googleMaps.Marker({
          position:this.center,
          map:map,
          title:'Picked Location'
        })
        marker.setMap(map);
      }
    
    }).catch(err=>{
      console.log(err);
    });
  }

  private getGoogleMap():Promise<any>{
    const win = window as any;
    const googleModule = win.google;
    if(googleModule && googleModule.maps){
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve,reject)=>{
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key="+environment.G_API_KEY;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = ()=>{
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps){
          resolve(loadedGoogleModule.maps);
        }else{
          reject('Google Maps SDK not available. ');
        }
      }
    })
  }

  onCancel(){
    this,this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.clickListener){

      this.googleMap.event.removeListener( this.clickListener)
    }
  }
}
