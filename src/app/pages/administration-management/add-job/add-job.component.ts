import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  job={
    "jobOffreId":null,
	  "jobOffreLabel":"",
	  "jobOffreDescription":"",
	  "jobOffreDomaineActivite":"null",
    "contractType":"",
	  "stageOffreCompetences":"",
    "jobOffreSalaire":0,
	  "jobOffreDateDebut":this.datePipe.transform(new Date(),"dd-MM-yyyy"),
    "jobOffreDateFin":this.datePipe.transform(new Date(),"dd-MM-yyyy"),
    "jobStatus":"OPENED",
  }
  @Output() cancelEvent = new EventEmitter();
  filiereList:any;
  constructor(private datePipe:DatePipe,private utilsService:UtilsService) { }

  ngOnInit(): void {
    this.getAllFilieres();
  }

  getAllFilieres() {
    this.utilsService.get(UtilsService.API_DOMAIN).subscribe(response => {
      this.filiereList = response;
    }, error => {
      this.utilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement de la liste des filiéres `);
    });
  }

  checkJobValid(){
   return false;
  }

  saveJob(){
    this.utilsService.post(
      UtilsService.API_JOB,this.job
    ).subscribe(
      (response) => {
        this.utilsService.showToast('success',
        'Offre ajoutée avec succés',
        `L'offre  ${this.job.jobOffreLabel} a été ajoutée avec succcés`);
        this.initJob();
        this.cancelEvent.emit();
      },
      (error) => {
        this.utilsService.showToast(
          "danger",
          "Erreur interne",
          `Un erreur interne a été produit lors du sauvgarde du l'offre d'emplois`
        );
        this.initJob();
      }
    );
  }

  cancel(){
      this.cancelEvent.emit();
  }

  initJob(){
    this.job={
      "jobOffreId":null,
      "jobOffreLabel":"",
      "jobOffreDescription":"",
      "jobOffreDomaineActivite":"null",
      "contractType":"",
      "stageOffreCompetences":"",
      "jobOffreSalaire":0,
      "jobOffreDateDebut":this.datePipe.transform(new Date(),"dd-MM-yyyy"),
      "jobOffreDateFin":this.datePipe.transform(new Date(),"dd-MM-yyyy"),
      "jobStatus":"OPENED",
    }  
  }
  compareFiliere(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a.domaineId === b.domaineId;
  }

}