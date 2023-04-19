import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  
  name:string = "";
  email:string = "";
  phone:string = "";
  message:string = "";

  constructor(private data1:AdminService,private routedata:ActivatedRoute){}
  
  alert(){
    window.alert('Thank You for Your Information. :) ')
  }

  send(){
    this.data1.createNewContact({
      name:this.name,
      email:this.email,
      phone:this.phone,
      message:this.message
    }).subscribe(data => {
      console.log(data);
      this.alert();
    })
  }

}
