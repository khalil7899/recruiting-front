import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  @Input() job={
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
    "jobReference": "",
  }
  @Output() cancelEvent = new EventEmitter();
  filiereList:any;
  constructor(private datePipe:DatePipe,private utilsService:UtilsService) {
    this.job.jobOffreDateDebut=this.datePipe.transform(new Date(),"dd-MM-yyyy");
    this.job.jobOffreDateFin=this.datePipe.transform(new Date(),"dd-MM-yyyy");
   }

  ngOnInit(): void {

    console.log("-----details job-----");
    console.log(this.job);
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
    console.log("----Job To Save------");
    this.job.jobOffreDateFin=this.datePipe.transform(this.job.jobOffreDateFin,"dd-MM-yyyy")
    this.job.jobOffreDateDebut=this.datePipe.transform(new Date(),"dd-MM-yyyy")

    console.log(this.job);
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
      "jobReference": "",
    }  
  }
  compareFiliere(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a.domaineId === b.domaineId;
  }

}