import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { Products } from '../../../assets/doubles/ProductStructure';
import { ActivatedRoute,Router} from '@angular/router';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent {
  id = '';
  dataproduct:Products = {};

  constructor(private datanew : AdminService , private routedata : ActivatedRoute ,private route:Router, private cartService : CartService){}

  ngOnInit() : void{
    this.id = this.routedata.snapshot.paramMap.get('id') || '-1'
    console.log(this.id);
    console.log('/' + this.id);
    this.datanew.GetProduct(this.id).subscribe((data)=>{
      this.dataproduct = data
      console.log(this.dataproduct)
    })
  }

  addtoCart(dataproduct: Products) {
    Object.assign(dataproduct, { quantity: 1, total: dataproduct.price });
    this.cartService.addtoCart(dataproduct);
  }
}
