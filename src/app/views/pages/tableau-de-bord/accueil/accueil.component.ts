import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';



@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  accepted: boolean = false;


  constructor(private modalService: NgbModal, private router: Router) {

  }

  async ngOnInit() {
  }

  openXlModal(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      // console.log(result);
      if (this.accepted) {
        this.goToKyc()
      }
    }).catch((res) => { });
  }


  goToKyc() {
    this.router.navigate(['/tableau-de-bord/kyc']);
  }


}
