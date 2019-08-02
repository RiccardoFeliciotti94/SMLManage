import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddBiddersPage } from './add-bidders.page';

const routes: Routes = [
  {
    path: '',
    component: AddBiddersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddBiddersPage]
})
export class AddBiddersPageModule {}
