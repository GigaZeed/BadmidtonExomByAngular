import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import  {ApiService } from '../../service/api.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string
  password: string
  email: string
  constructor(private _api: AuthService, private router: Router) {}

  register() {
    console.log(this.username)
    console.log(this.password)
    console.log(this.email)
    this._api.register({
      username: this.username,
      password: this.password,
      email: this.email
    }).subscribe(e => {
      if (e.status === 201) {
        this._api.setToken(e.data.token)
        this.router.navigateByUrl('/home')
      }
    })
  }
}
