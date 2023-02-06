import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoringListComponent } from './list-scoring/scoring-list.component';
import { NewScoringComponent } from './new-scoring/new-scoring.component';
import { ViewScoringComponent } from './view-scoring/view-scoring.component';

const routes: Routes = [
  { path: '', component: ScoringListComponent },
  { path: 'new', component: NewScoringComponent },
  { path: 'view/:score', component: ViewScoringComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditScoringRoutingModule { }
