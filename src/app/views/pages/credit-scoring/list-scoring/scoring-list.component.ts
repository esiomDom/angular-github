import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-scoring-list',
  templateUrl: './scoring-list.component.html',
  styleUrls: ['./scoring-list.component.scss']
})
export class ScoringListComponent implements OnInit {
  scorings: any[] = []

  constructor(private router: Router, private dbService: NgxIndexedDBService) { }

  async ngOnInit() {
    await this.dbService.getAll('scoring').subscribe(scorings => {
      console.log(scorings)
      this.scorings = scorings
    });
  }

  goToCreditScoringForm() {
    this.router.navigate(['/credit-scoring/new']);
  }

  goToCreditScoringView(score: any) {
    this.router.navigate(['/credit-scoring/view', score]);
  }


}
