import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { Products } from '../../../assets/doubles/ProductStructure';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent {

  dataproduct:Products[] = [];

  constructor(private datanew : AdminService, private cartService : CartService){}

  ngOnInit(){
    this.datanew.GetProducts().subscribe((data)=>{
      console.log(this.dataproduct = data) 

      

      this.dataproduct.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price});
      })

    })
  }

  addtoCart(dtpd : any ){
    this.cartService.addtoCart(dtpd);
  }
}
