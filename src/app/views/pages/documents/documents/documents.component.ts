import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentComponent implements OnInit {

  public isAsideNavCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
