import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userAuthenticated:boolean=true;
  private _userId:string= 'abc';

  constructor() { }

  get userAuthenticated():boolean{
    return this._userAuthenticated;
  }

  get userId():string{
    return this._userId;
  }

  login(){
    this._userAuthenticated = true;
  }

  logout(){
    this._userAuthenticated = false;
  }
}
