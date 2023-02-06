import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { KyBComponent } from './kyb/kyb.component';
import { KycComponent } from './kyc/kyc.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'kyc', component: KycComponent },
  { path: 'kyb', component: KyBComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableauDeBordRoutingModule { }
