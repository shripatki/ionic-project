import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Capacitor,Plugins} from '@capacitor/core'



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    
    private  authService:AuthService,
    private router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
     if (Capacitor.isPluginAvailable('SplashScreen')){
       Plugins.SplashScreen.hide();
     }
    });
  }
  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
