import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as $ from "jquery";
import {interval, Subject} from "rxjs";
import "rxjs/add/operator/takeUntil";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {ReponseEleve} from "../../models/models.reponseeleve";
import {UtilsService} from "../../services/utils.service";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  public idquizz = 0;
  public idpartie = 0;
  public iduser;
  public serverUrl = environment.websocketCompetitionUrl;
  public stompClient;
  public participate: boolean = false;
  public new_quizz: boolean = false;
  public indices: any;
  public reponses: any;
  public question: string = "";
  public loaded: boolean = false;
  public hasIndices: boolean = false;
  public interval: any;
  public htmlToAdd = "";
  public badAnswer = "";
  public  codePartie = "";
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public  cpt: number = 0;
  public repEelev: ReponseEleve;
  public enable_load: boolean = false;

  constructor(public route: ActivatedRoute, public utilsvc: UtilsService, public router: Router) {
  }

  public initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/competition/V2/" + that.idquizz+"/"+that.iduser, (message) => {
        if (message.body) {
          console.log("MESSAGE RECU = " + message.body)
          that.codePartie = message.body;
          that.new_quizz = false;
        }
      });
    });
  }

  public competitionWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/competition/V2/partie/" + that.idpartie, (message) => {
        if (message.body) {
          if (message.body === "load-disable") {
            that.loaded = true;
            that.new_quizz = false;
            that.participate = false;
            that.codePartie = "";
            that.enable_load = false;
          } else if (message.body === "fin-quizz") {
            that.destroy$.next(true);
            alert("Quizz términé => rediriger vers une page !");
            that.router.navigate(["/listQuizzs/", that.utilsvc.crypt(that.iduser)]);
          } else if (message.body === "mauvaise-reponse") {
            that.badAnswer = "Un utilisateur s'est trompé répondez viiiite...";
          } else {
            that.badAnswer = "";
            that.htmlToAdd = "";
            const obj = JSON.parse(message.body);
            that.question = obj.map.question;
            that.indices = obj.map.indices;
            that.reponses = obj.map.reponses;
            if (that.indices.length > 0) {
              that.hasIndices = true;
              that.destroy$.next(false);
              that.interval = interval(10000).takeUntil(that.destroy$).subscribe(() => {
                console.log("INTERVAL : **********");
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
    this.stompClient.send("/app/V2/load/quizz/" + this.idpartie , {}, this.idpartie);
  }

  public participer(idPartie){
    this.idpartie = idPartie;
    this.participate = false;
    this.new_quizz = false;
    this.enable_load = true;
    this.competitionWebSocketConnection();

  }

  public nouveauQuizz() {
    this.participate = true;
    this.stompClient.send("/app/V2/new/quizz/" + this.idquizz +"/"+this.iduser, {}, this.idquizz);
  }

  public sendMessage(message) {
    const dataForm = {reponse_eleve: "", user: null};
    dataForm.reponse_eleve = message;
    dataForm.user = this.iduser;
    this.stompClient.send("/app/V2/" + this.idpartie , {}, JSON.stringify(dataForm));
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquizz =  +this.utilsvc.decrypt(params.idQuizz);
      this.iduser = localStorage.getItem("userID");
      this.initializeWebSocketConnection();
      console.log("ID QUIZZ = " + this.idquizz);
      console.log("ID USER = " + this.iduser);
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

}
