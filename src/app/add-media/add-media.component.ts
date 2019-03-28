import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MediaService} from "../../services/media.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.css']
})
export class AddMediaComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  public idquestion: any;
  progress: { percentage: number } = { percentage: 0 };

  public errorMsg: string = "";
  public successMsg: string = "";


  constructor(private uploadService:MediaService, public route: ActivatedRoute, public utilsvc: UtilsService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquestion = +this.utilsvc.decrypt(params.idQuestion);
    }, (err) => {
      console.log(err._body);
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  public upload() {
      this.progress.percentage = 0;

      this.currentFileUpload = this.selectedFiles.item(0);
      this.uploadService.pushFileToStorage(this.currentFileUpload , this.idquestion).subscribe( (data) => {
        console.log("SUCCESS");
        //this.error = "";
      }, (err) => {
        if(err.status!=200){
          this.errorMsg = "Une erreur est survenu ! Réessayez plus tard...";
        }else {
          this.successMsg = "Media ajouté avec succès";
        }
        console.log(err.status);
        console.log("ERROR");


      });

      this.selectedFiles = undefined;


  }

}
