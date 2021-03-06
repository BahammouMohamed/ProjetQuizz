import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as $ from "jquery";
import {interval, Subject} from "rxjs";
import "rxjs/add/operator/takeUntil";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {UtilsService} from "../../services/utils.service";

import { environment } from "../../environments/environment";

@Component({
  selector: 'app-solo',
  templateUrl: './solo.component.html',
  styleUrls: ['./solo.component.css']
})
export class SoloComponent implements OnInit {
  public idquizz = 0;
  public iduser;
  public idPartie;
  public serverUrl = environment.websocketSoloUrl;
  public stompClient;
  public indices: any;
  public reponses: any;
  public question: string = "";
  public loaded: boolean = false;
  public hasIndices: boolean = false;
  public interval: any;
  public htmlToAdd = "";
  public badAnswer = "";
  public error = "";
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public  cpt: number = 0;
  public image: string;

  constructor(public route: ActivatedRoute, public utilsvc: UtilsService, public router: Router) {
  }

  public initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/solo/"+that.iduser, (message) => {
        if (message.body) {
          // TODO Use switch instead of if else if
          console.log("MSG RECEIVED ******");
          if (message.body.startsWith("code-partie ")) {
            that.idPartie = message.body.replace("code-partie ", "");
          } else if (message.body === "erreur") {
            that.error = "Une erreur est survenu... Réessayez plus tard ";
          }else if (message.body === "load-disable") {
            that.loaded = true;
          } else if (message.body === "fin-quizz") {
            that.destroy$.next(true);
            alert("Quizz términé => rediriger vers une page !");
            that.router.navigate(["/listQuizzs/", that.utilsvc.crypt(that.iduser)]);
          } else if (message.body === "mauvaise-reponse") {
            that.badAnswer = "Mauvaise réponse réessayez...";
          } else {
            that.badAnswer = "";
            that.htmlToAdd = "";
            const obj = JSON.parse(message.body);
            that.question = obj.map.question;
            that.indices = obj.map.indices;
            that.reponses = obj.map.reponses;
            that.image = obj.map.media;
            if (that.indices.length > 0) {
              that.hasIndices = true;
              that.destroy$.next(false);
              that.interval = interval(10000).takeUntil(that.destroy$).subscribe(() => {
                that.htmlToAdd = that.indices[that.cpt];
                if (that.cpt <  that.indices.length - 1) {
                  that.cpt++;
                } else {
                  that.cpt = 0;
                }
              } );
            }
          }
        }
      });
    });
  }
  public loadQuizz() {
    this.stompClient.send("/app/solo/load/quizz/" + this.idquizz +"/"+this.iduser , {}, this.idquizz);
  }

  public sendReponse(message) {
    const dataForm = {reponse_eleve: "", user: null};
    dataForm.reponse_eleve = message;
    dataForm.user = this.iduser;
    this.stompClient.send("/app/solo/" + this.iduser , {}, JSON.stringify(dataForm));

  }

  public sendIgnore() {
    const dataFormIgnore = {reponse_eleve: "", user: null};
    dataFormIgnore.reponse_eleve = "Ignored";
    dataFormIgnore.user = this.iduser;
    this.stompClient.send("/app/solo/ignore/" + this.iduser , {}, JSON.stringify(dataFormIgnore));

  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquizz =  +this.utilsvc.decrypt(params.idQuizz);
      this.iduser = +localStorage.getItem("userID");
      this.initializeWebSocketConnection();
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }
}
