import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import "rxjs/add/operator/map";
import {UsersService} from "../../services/users.service";
import {UtilsService} from '../../services/utils.service';
import { Router } from '@angular/router';
import { error } from 'util';

@Component({
  selector: "app-users",
  styleUrls: ["./users.component.css"],
  templateUrl: "./users.component.html",
})
export class UsersComponent implements OnInit {

  public pageUsers: any;

  constructor(public router:Router, public http: HttpClient, public userstsvc: UsersService, public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.userstsvc.getUsers()
      .subscribe( (data) => {
        this.pageUsers = data;
        
      }, error => {

        if(error.status==403){
          this.router.navigateByUrl('/accessDenied');
        }else if(error.status==404){
          this.router.navigateByUrl('/pageIntrouvable');
        } else if(error.status==401){
          console.log("La requête nécessite une identification de l'utilisateur");
          this.router.navigateByUrl('/login');
        } else{
          this.router.navigateByUrl('/errorPage');
          
        }

              });
  }

  public deleteUser(idUser: any) {
    const confirmation = confirm("Etes-vous sur de vouloir supprimer l'utilisateur ? La supression entraine " +
      "la supression de tous les Quizzs de l'utilisateur");
    if (confirmation) {
      console.log("Confirmation = " + confirmation + " User = " + idUser);
      this.userstsvc.deleteUser(idUser)
        .subscribe( (data) => {
          console.log("DELETED SUCCESSFULLY");
          this.ngOnInit();
        },error => {

          if(error.status==403){
            this.router.navigateByUrl('/accessDenied');
          }else if(error.status==404){
            this.router.navigateByUrl('/pageIntrouvable');
          } else if(error.status==401){
            console.log("La requête nécessite une identification de l'utilisateur");
            this.router.navigateByUrl('/login');
          } else{
            this.router.navigateByUrl('/errorPage');
            
          }
  
                });
    } else {
      console.log("Confirmation = " + confirmation + " User = " + idUser);
    }
  }
}
