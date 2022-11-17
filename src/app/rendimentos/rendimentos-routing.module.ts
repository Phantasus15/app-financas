import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RendimentosPage } from './rendimentos.page';

const routes: Routes = [
  {
    path: '',
    component: RendimentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RendimentosPageRoutingModule {}
