import { Component, OnInit } from '@angular/core';
import {IndicesService} from '../../services/indices.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-enseignant-dashboard',
  templateUrl: './enseignant-dashboard.component.html',
  styleUrls: ['./enseignant-dashboard.component.css']
})
export class EnseignantDashboardComponent implements OnInit {

  constructor(public utilsvc: UtilsService) { }

  ngOnInit() {
  }

}
