import{Injectable} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt'
import {environment} from "../environments/environment";
import {Quizz} from "../models/models.quizz";

@Injectable()
export class AuthenticationService{
    

 private roles:Array<any>;
 private jwtHelper;
 
    constructor(private http:HttpClient){
        this.jwtHelper= new JwtHelperService();

    }

    login(user){
        return this.http.post(environment.url+"/login",user, {observe:'response'});
    }

    saveToken(jwt:string){
       
        localStorage.setItem('token',jwt);
        
        this.roles=this.jwtHelper.decodeToken(this.loadToken()).roles;
    }
    

    
    loadToken(){
       if(localStorage.getItem('token')!=null){
       
        this.roles=this.jwtHelper.decodeToken(localStorage.getItem('token')).roles;
        return localStorage.getItem('token');
    
    }
       else{return null;}
    }

   getUsername(){
       return this.jwtHelper.decodeToken(localStorage.getItem('token')).sub;
   }

    logout(){
        
        localStorage.removeItem('token');
        localStorage.removeItem("userID");
    }

    isAdmin(){
        if(this.isAuth()){
        for(let r of this.roles){
            if(r.authority=='ADMIN') return true;
        }
        }
        return false;
    }

    isEleve(){
        if(this.isAuth()){
            for(let r of this.roles){
                if(r.authority=='ELEVE') return true;
            }
            }
            return false;
    }

    isEnseignant(){
        if(this.isAuth()){
            for(let r of this.roles){
                if(r.authority=='ENSEIGNANT') return true;
            }
            }
            return false;
    }

    isAuth(){
       
        if(this.loadToken()!=null){
         return true;
        }
        return false;
    }

    public saveQuizzAuth(quizz: Quizz) {

        return this.http.post(environment.url+"/quizzs", quizz,{headers:new HttpHeaders({'Authorization':this.loadToken()})});
        
      }
}