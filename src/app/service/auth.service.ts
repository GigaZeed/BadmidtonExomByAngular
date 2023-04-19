import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUr: string = 'http://localhost:8000/api';

  token: string = localStorage.getItem('userToken')
  headers: HttpHeaders 
  constructor(private _http:HttpClient,private router:Router) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
   }
   login({ username, password }): Observable<{ status: number, data: { token: string } }> {
    return this._http.post<{ status: number, data: { token: string } }>(`${this.apiUr}/login`, { username, password })
  }
  setToken(token) {
    localStorage.setItem("userToken", token)
  }
  logout(): void {
    localStorage.removeItem("userToken")
    this.router.navigate(['/home'])
  }
  isLogin() {
    return localStorage.getItem('userToken') === "" || !localStorage.getItem('userToken') ? false : true
  }
  register(user): Observable<{ status: number, data: { token: string } }> {
    return this._http.post<{ status: number, data: { token: string } }>(`${this.apiUr}/register`, { ...user })
  }
  goToLoginPage() {
    this.logout()
    this.router.navigate(['/login'])
  }
}
