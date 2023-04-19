import { Component } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { AdminService } from '../../service/admin.service';
import { Products } from '../../../assets/doubles/ProductStructure';
import {CartObj} from '../../../assets/doubles/CartStructure';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart:CartObj = {};

  public products : any = [];
  public grandTotal !: number;
  constructor(private data1:AdminService,private cartService : CartService){}

  ngOnInit(): void{
    this.cartService.getProducts()
    .subscribe(res=>{
      // console.log(res);
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
    // console.log(this.cartService.get());

    this.cart = {
      cartproducts: [], 
      totalall: '0'
    };
  }

  removeItem(dtpd : any){
    this.cartService.removeCartItem(dtpd);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  
  incrementQuantity(product: any) {
    product.quantity += 1;
    product.total = product.price * product.quantity;
    this.cartService.productList.next(this.products);
    this.grandTotal = this.cartService.getTotalPrice();
  }

  decrementQuantity(product: any) {
    if (product.quantity <= 1) {
      return;
    }
    product.quantity -= 1;
    product.total = product.price * product.quantity;
    this.cartService.productList.next(this.products);
    this.grandTotal = this.cartService.getTotalPrice();
  }

  payclick(){
    window.alert('Successful purchase, please wait for the products to be sent to you.')
    // this.emptycart();
    console.log(this.products);
    this.sendCart();
  }

  sendCart(){const cart = {
    cartproducts: this.products.map((p: any) => ({
      name: p.name,
      pic: p.pic,
      descript: p.descript,
      price: p.price,
      qty: p.quantity,
      total: p.total
    })),
    totalall: this.grandTotal.toString()
  };
  this.data1.createCart({ cart })
    .subscribe(data => {
      console.log(data);
      console.log(cart);
    });
  }

}
