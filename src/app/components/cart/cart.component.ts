import { Component } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { AdminService } from '../../service/admin.service';
import { Products } from '../../../assets/doubles/ProductStructure';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public products : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService){}

  ngOnInit(): void{
    this.cartService.getProducts()
    .subscribe(res=>{
      console.log(res);
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
    console.log(this.cartService.get());
    
  }

  removeItem(dtpd : any){
    this.cartService.removeCartItem(dtpd);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
}
