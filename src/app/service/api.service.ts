import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { UserService } from '../service/user.service'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: HttpHeaders
  apiUr: string =
    'http://localhost:8000/api'
  token: string

  constructor(private _http: HttpClient, private router: Router) { 
    this.token = localStorage.getItem('userToken')
    console.log(this.token);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  Api() {
    return {
      user: new UserService(this._http, this.apiUr, this.headers)
    }
  }

}
