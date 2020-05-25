import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewOffersPageRoutingModule } from './new-offers-routing.module';

import { NewOffersPage } from './new-offers.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewOffersPageRoutingModule,
    SharedModule
  ],
  declarations: [NewOffersPage]
})
export class NewOffersPageModule {}
