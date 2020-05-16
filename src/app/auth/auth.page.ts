import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading:boolean;
  isLogin:boolean=true;
  @ViewChild('f1',{static:false}) form: any;

  constructor(
    private authService:AuthService, 
    private router:Router,
    private loadingController:LoadingController) { }

  ngOnInit() {
  }

  onLogin(){
    this.isLoading = true;
    this.authService.login();
    this.loadingController.create({'keyboardClose':true,message:'Logging in...'}).then(loadingElm =>{
      loadingElm.present();
      setTimeout(()=>{
        this.isLoading = false;
        loadingElm.dismiss();
        this.router.navigateByUrl('/places/tabs/discover');
      },1500)
    })
  }

  onSubmit(f:any){
    console.log(this.form);
    console.log(f);
    if(!this.form.valid){
      return;
    }
    const email = this.form.value.email
    const password = this.form.value.password
    if(this.isLogin){
      //LOGIN
    }else{
      //SIGN UP
    }
    this.onLogin();
  }

  onSwichAuthMode(){
    this.isLogin =!this.isLogin;
  }

}
