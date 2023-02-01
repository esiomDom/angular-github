import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditScoringComponent } from './credit-scoring.component';

const routes: Routes = [{ path: '', component: CreditScoringComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditScoringRoutingModule { }
