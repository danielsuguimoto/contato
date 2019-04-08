import { UpdateComponent } from './components/contact/update/update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './components/contact/listing/listing.component';
import { CreateComponent } from './components/contact/create/create.component';

const routes: Routes = [
  {
    path: '',
    component: ListingComponent
  },
  {
    path: 'create-contact',
    component: CreateComponent
  },
  {
    path: 'edit-contact/:id',
    component: UpdateComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
