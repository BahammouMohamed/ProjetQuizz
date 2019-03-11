import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import * as $ from "jquery";
import {interval, Subject} from "rxjs";
import "rxjs/add/operator/takeUntil";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: "app-competition-show-question",
  styleUrls: ["./competition-show-question.component.css"],
  templateUrl: "./competition-show-question.component.html",
})
export class CompetitionShowQuestionComponent implements OnInit {
  public idquizz = 0;
  public iduser;
  public serverUrl = "http://localhost:8080/socket";
  public stompClient;
  public indices: any;
  public reponses: any;
  public question: string = "";
  public loaded: boolean = false;
  public hasIndices: boolean = false;
  public interval: any;
  public htmlToAdd = "";
  public badAnswer = "";
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public  cpt: number = 0;

  constructor(public route: ActivatedRoute, public utilsvc: UtilsService, public router: Router) {
  }

  public initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/competition/" + that.idquizz, (message) => {
        if (message.body) {
          // that.htmlToAdd = "";
          // that.badAnswer = "";
          // TODO ici récupérer l'objet JSON et lire la question + les indices + les reponses
          //  et les afficher dans l'html
          if (message.body === "load-disable") {
            that.loaded = true;
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
    this.stompClient.send("/app/load/quizz/" + this.idquizz , {}, this.idquizz);
  }

  public sendMessage(message) {
    this.stompClient.send("/app/" + this.idquizz , {}, message);
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
