import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'ngx-mes-offres',
  templateUrl: './mes-offres.component.html',
  styleUrls: ['./mes-offres.component.scss']
})
export class MesOffresComponent implements OnInit {
  isAdmin: boolean = false;
  isRh: boolean = false;
  isCandidat: boolean = false;
  isTrainee: boolean = false;
  user = {
    userId: null,
    userFirstName: null,
    userLastName: null,
    userPictureUrl: null,
    userBirthDate: null,
    userGender: null,
    userBirthCountry: null,
    userBirthCity: null,
    userNRue: null,
    userPays: null,
    userCity: null,
    userEmail: null,
    userPhoneNumber: null,
    // userLogin: null,
    userCivilStatus: null,
    createdAt: null,
    updatedAt: null,
    userCvUrl: null,
  };
  candidate: any = {
    candidatEcole: "",
    candidatDiplome: "",
    candidatAnneeDiplome: null,
    candidatNumberExperience: null,
    candidatFiliere: [],
  };
  trainee: any = {
    stagiaireEcole: "",
    stagiaireFuturDiplome: "",
    stagiaireNiveauEtude: "",
    stagiaireFiliere: [],
  }
  candJobList: any;
  jobOffre: any;
  loadingOffre:boolean=false;
  constructor(private sanitizer: DomSanitizer, private utilsService: UtilsService, private route: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("userRole") === "ADMINISTRATOR") {
      this.isAdmin = true;
    }
    else
      if (localStorage.getItem("userRole") === "RH") {
        this.isRh = true;

      } else
        if (localStorage.getItem("userRole") === "CANDIDATE") {
          this.isCandidat = true;

        } else
          if (localStorage.getItem("userRole") === "TRAINEE") {
            this.isTrainee = true;
          }

    if (this.isCandidat == true || this.isTrainee == true) {
      this.getCurrentUser();
    }



  }

  getCurrentUser() {
    this.utilsService.get(UtilsService.API_USER).subscribe(async response => {
      if (response != null && response.userDto != null) {
        console.log(response);
        this.user = response.userDto;
      }
      if (response != null && response.stagiaireDto != null) {
        this.trainee = response.stagiaireDto;
        var candJobs = this.trainee.candStages;
       await candJobs.forEach(async candStage => {
          this.jobOffre=await this.utilsService.get(UtilsService.API_JOB + "/bycandjob/" + candStage.idCandJob).toPromise();
            candStage.jobOffre=this.jobOffre;
            console.log("------Job Offre---------")
            console.log(this.jobOffre);

        });
        this.candJobList=candJobs;
        console.log("---------list candidatures des stages------------");
        console.log(this.candJobList);
        this.loadingOffre=true;

      }
      if (response != null && response.candidatDto != null) {
        this.candidate = response.candidatDto;
        var candJobs = this.candidate.candJobs;
        await candJobs.forEach(async candJob => {
          this.jobOffre=await this.utilsService.get(UtilsService.API_JOB + "/bycandjob/" + candJob.idCandJob).toPromise();
           candJob.jobOffre=this.jobOffre;
            console.log("------Job Offre---------")
            console.log(this.jobOffre);


        });
        this.candJobList=candJobs;
        console.log("---------list candidatures des jobs------------");
        console.log(this.candJobList);
        this.loadingOffre=true;
        
      }

    }, error => {
      this.utilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement de l'utilisateur `);
    });
  }
  detailCand(cand)
  {
    console.log("------detail offre-------");
    console.log(cand);
  }
}