import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service'
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  _api : AuthService
  public totalItem : number = 0;
  constructor(private cartService : CartService ,private api:AuthService){
    this._api = api
  }

  ngOnInit() : void{
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }

}
