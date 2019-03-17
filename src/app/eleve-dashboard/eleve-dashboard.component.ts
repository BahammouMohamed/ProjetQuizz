import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-eleve-dashboard',
  templateUrl: './eleve-dashboard.component.html',
  styleUrls: ['./eleve-dashboard.component.css']
})
export class EleveDashboardComponent implements OnInit {

  public iduser: any;
  constructor(public utilsvc: UtilsService) { }

  ngOnInit() {
    this.iduser = localStorage.getItem("userID");
  }

}
