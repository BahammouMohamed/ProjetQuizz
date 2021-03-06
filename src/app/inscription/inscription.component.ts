import { Component, OnInit } from "@angular/core";
import {User} from "../../models/models.user";
import {UsersService} from "../../services/users.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-inscription",
  templateUrl: "./inscription.component.html",
  styleUrls: ["./inscription.component.css"],
})
export class InscriptionComponent implements OnInit {

  private user: User = new User();
  private mode: number = 1;
  private msgerror: string = "";
  constructor(public router:Router ,public usersvc: UsersService) { }

  public ngOnInit() {
    this.msgerror = "";
  }

  public saveUser() {
    this.usersvc.saveUser(this.user)
      .subscribe( (data) => {

        // @ts-ignore
        this.user = data;
        this.mode = 2;

      }, error => {

        if(error.status==403){
          this.router.navigateByUrl('/accessDenied');
        }else if(error.status==404){
          this.router.navigateByUrl('/pageIntrouvable');
        } else if(error.status==401){
          console.log("La requête nécessite une identification de l'utilisateur");
          this.router.navigateByUrl('/login');
        } else if(error.status==500){
          console.log("UNE ERREUR S4EST PRODUIT");
          this.msgerror = "Email ou pseudo existe déja";
        }else{
          this.router.navigateByUrl('/errorPage');
          
        }

      });
  }
}
