import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { Products } from '../../../assets/doubles/ProductStructure';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent {

  dataproduct:Products[] = [];

  constructor(private datanew : AdminService){}

  ngOnInit(){
    this.datanew.GetProducts().subscribe((data)=>{
      // this.dataproduct = data
      console.log(this.dataproduct = data)
    })
  }
}
