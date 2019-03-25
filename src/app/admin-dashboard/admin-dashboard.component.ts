import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public iduser: any;
  constructor(public utilsvc: UtilsService) { }

  ngOnInit() {
    this.iduser = localStorage.getItem("userID");
  }

}
