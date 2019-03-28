import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Multimedia } from '../models/models.media';
import {AuthenticationService} from "./authentication.service";

import {environment} from "../environments/environment";

@Injectable({
 providedIn: 'root'
})
export class MediaService {
  private media: Multimedia = new Multimedia();
  constructor(public http: HttpClient ,public authService:AuthenticationService) { }
 
  pushFileToStorage(file: File, idquestion:string) {
    const formdata: FormData = new FormData();
    
    this.media.path_media = idquestion+"--"+file.name;

    formdata.append('file', file, idquestion+"--"+file.name);
    formdata.append('question',idquestion);
    return this.http.post(environment.url+"/medias", formdata, {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})})
    .map((resp) => resp);
  }
 
  getFiles(): Observable<any> {
    return this.http.get('/getallfiles');
  }
}



