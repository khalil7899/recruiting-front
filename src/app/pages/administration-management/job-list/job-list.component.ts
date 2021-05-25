import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  displayAddJob = false;
  displayDetailsJob = false;
  jobList = [];
  isAdmin: boolean = false;
  isRh: boolean = false;
  isCandidat: boolean = false;
  isTrainee: boolean = false;
  job = {
    "jobOffreId": null,
    "jobOffreLabel": "",
    "jobOffreDescription": "",
    "jobOffreDomaineActivite": null,
    "contractType": "",
    "stageOffreCompetences": "",
    "jobOffreSalaire": 0,
    "jobOffreDateDebut": this.datePipe.transform(new Date(), "dd-MM-yyyy"),
    "jobOffreDateFin": this.datePipe.transform(new Date(), "dd-MM-yyyy"),
    "jobStatus": "OPENED",
    "jobReference": "",
  }

  apiOffreFiltred: any;
  constructor(private utilsService: UtilsService, private datePipe: DatePipe) { 
    this.job.jobOffreDateDebut=this.datePipe.transform(new Date(),"dd-MM-yyyy");
    this.job.jobOffreDateFin=this.datePipe.transform(new Date(),"dd-MM-yyyy");
  }

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
    this.getAllJobs();
  }

  showAddJobWindow() {
    this.displayAddJob = true;
  }

  hideAddJobWindow() {
    this.getAllJobs();
    this.displayAddJob = false;
  }
  hideDetailsJobWindow() {
    this.getAllJobs();
    this.displayDetailsJob = false;
  }
  getAllJobs() {
    this.apiOffreFiltred = UtilsService.API_JOB;
    if (this.isCandidat == true) {
      this.apiOffreFiltred = this.apiOffreFiltred + "/candidatures"
    }
    else if (this.isTrainee == true) {
      this.apiOffreFiltred = this.apiOffreFiltred + "/stages"
    }
    else {
      this.apiOffreFiltred = this.apiOffreFiltred + "/candidatures"

    }
    this.utilsService.get(this.apiOffreFiltred).subscribe(
      (response) => {
        this.jobList = response;
        console.log("-----job lists----");
        console.log(this.jobList);
      },
      (error) => {
        this.utilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors du chargement des l'offre d'emplois`
        );
      }
    );
  }

  showPlus(job) {
    console.log("---show Plus----")
    this.job = job;
    this.displayDetailsJob = true;
  }
  cancelDetailsHandler() {
    console.log("--------handler event--------");
    this.displayDetailsJob = false;
    this.displayAddJob = false;
    this.getAllJobs();

  }
}
