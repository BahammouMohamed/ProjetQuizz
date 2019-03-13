import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/models.user";
import {UsersService} from "../../services/users.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: "app-edit-user",
  styleUrls: ["./edit-user.component.css"],
  templateUrl: "./edit-user.component.html",
  })
export class EditUserComponent implements OnInit {
  private iduser: number;
  private user: User;
  private mode: number = 1;
  constructor(public router:Router ,public usersvc: UsersService, public route: ActivatedRoute, public utilsvc: UtilsService) {
    this.user = new User();
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.iduser = +this.utilsvc.decrypt(params.idUser);
      this.usersvc.getUserById(this.iduser)
        .subscribe( (user) => {
          // @ts-ignore
          this.user = user;
          console.log("UPDATE USER : " + this.user.id);
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

  public editUser() {
    console.log("UPDATE USER : " + this.user.id);
    this.usersvc.updateUser(this.user)
      .subscribe( (data) => {
        // @ts-ignore
        this.user = data;
        this.mode = 2;
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
  }

}
