import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service";
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode:number=0;
  constructor(private authService : AuthenticationService,private utilstsvc:UtilsService, private router:Router) { }

  ngOnInit() {
    
  }
  
  onLogin(user){
    this.authService.login(user).subscribe( resp=>{

      let jwt =resp.headers.get('Authorization');
      this.authService.saveToken(jwt);
      if(this.authService.isAdmin()){this.router.navigateByUrl('/adminDashboard');}
      else if(this.authService.isEnseignant()){this.router.navigateByUrl('/enseignantDashboard');}
      else if(this.authService.isEleve()){this.router.navigateByUrl('/eleveDashboard');}




      this.utilstsvc.getUserByUsername(this.authService.getUsername())
        .subscribe( (data) => {
          const datatmp = JSON.parse(JSON.stringify(data));
         localStorage.setItem("userID", datatmp.id);
        }, error => {

                });

      
      
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
