import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  displayAddJob=false;

  jobList=[];

  job={
    "jobOffreId":"",
	  "jobOffreLabel":"jobOffreLabel",
	  "jobOffreDescription":"jobOffreDescription",
	  "jobOffreDomaineActivite":"jobOffreDomaineActivite",
	  "stageOffreCompetences":"stageOffreCompetences",
    "jobOffreSalaire":"jobOffreSalaire",
	  "jobOffreDateDebut":"jobOffreDateDebut",
    "jobOffreDateFin":"jobOffreDateFin",
    "jobStatus":"jobStatus",
    "candJobs":["",""],
  }

  constructor(private utilsService:UtilsService) { }

  ngOnInit(): void {
    this.getAllJobs();
  }

showAddJobWindow(){
  this.displayAddJob=true;
}

hideAddJobWindow(){
  this.getAllJobs();
  this.displayAddJob=false;
}

getAllJobs(){
  this.utilsService.get(UtilsService.API_JOB).subscribe(
    (response) => {
      this.jobList=response;
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

showPlus(job){

}

}