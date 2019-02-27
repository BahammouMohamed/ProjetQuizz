import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {

  public infos = {
    nom: "bahammou",
    prenom: "mohamed",
    pseudo: "med-kun",
    password: "pass",
    email: "med@gmail.com",
    status: "eleve",
  };

  public users = [
    {nom: "bahammou", prenom: "mohamed", pseudo: "med-kun", password: "pass", email: "med@gmail.com", status: "eleve"},
    {nom: "alla", prenom: "reda", pseudo: "red-kun", password: "pass", email: "red@gmail.com", status: "eleve"},
    {nom: "beghazi", prenom: "zouhair", pseudo: "zou-kun", password: "pass", email: "zou@gmail.com", status: "eleve"},
  ];

  constructor() { }

  public ngOnInit() {
  }

}
