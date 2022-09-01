import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.scss']
})
export class TableauDeBordComponent {


  finishFunction() {
    alert('Successfully Completed');
  }
}
