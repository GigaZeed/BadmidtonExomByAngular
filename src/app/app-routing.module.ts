import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddComponent } from './components/add/add.component';
import { DetailsComponent } from './components/details/details.component';
import { ListsComponent } from './components/lists/lists.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'Add'},
  {path:'Addnew',component:AddComponent},
  {path:'Edit',component:DetailsComponent},
  {path:'List',component:ListsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
