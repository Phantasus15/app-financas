import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RendimentosPageRoutingModule } from './rendimentos-routing.module';

import { RendimentosPage } from './rendimentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RendimentosPageRoutingModule
  ],
  declarations: [RendimentosPage]
})
export class RendimentosPageModule {}
