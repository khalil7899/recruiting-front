import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-dashboard-candidat-by-offre',
  templateUrl: './dashboard-candidat-by-offre.component.html',
  styleUrls: ['./dashboard-candidat-by-offre.component.scss']
})
export class DashboardCandidatByOffreComponent implements OnInit {

  candidatByOffreData: any;
  offreLabels: any = [];
  candidatTotal: any = [];
  candidatRetenu: any = [];
  candidatOffreTotal: any = [];
  candidatOffreRetenu: any = [];
  candidat = {
    startDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    endDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
  };
  constructor(private utilsService: UtilsService, private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.candidat.startDate = this.datePipe.transform(new Date().setMonth(new Date().getMonth() - 3), 'yyyy-MM-dd')
    this.candidatByOffreData = {
      labels: [],
      datasets: [
        {
          label: 'nombre total des candidatures par offre',
          backgroundColor: '#42A5F5',
          data: []
        },
        {
          label: 'nombre des candidatures retenues par offre',
          backgroundColor: '#FFA726',
          data: []
        }
      ]
    };
    this.getCandidatTotalByOffre();

  }

  getCandidatTotalByOffre() {
    this.utilsService.get(UtilsService.API_STATISTIC + "/candidat-total/" + this.candidat.startDate + '/' + this.candidat.endDate).subscribe(data => {
      console.log("----success Total----");
      console.log(data);
      for (let i=0;i<data.length;i++){
        this.offreLabels.push(data[i].jobOffre.jobOffreLabel);
        this.candidatOffreTotal.push(data[i].jobOffre)
        this.candidatTotal.push(data[i].nbCandidat);
      };
      this.candidatByOffreData.labels = this.offreLabels;
      this.candidatByOffreData.datasets[0]["data"] = this.candidatTotal;
      this.offreLabels = [];
      this.candidatTotal = []
      this.getCandidatRetenuByOffre();

    },
      (error) => {
        console.log("error");
      })
  }
  getCandidatRetenuByOffre() {
    this.utilsService.get(UtilsService.API_STATISTIC + "/candidat-retenu/" + this.candidat.startDate + '/' + this.candidat.endDate).subscribe(data => {
      console.log("----success retenu----");
      console.log(data);
      this.candidatOffreRetenu=data;
      this.candidatOffreTotal.forEach(element => {
        if(this.getNbCandidatByOffre(element)==-1 || this.candidatOffreRetenu.length==0)
        {
          this.candidatRetenu.push(0)
        }
        else{
        this.candidatRetenu.push(this.candidatOffreRetenu[this.getNbCandidatByOffre(element)].nbCandidat);
        }
      });
      this.candidatByOffreData.datasets[1]["data"] = this.candidatRetenu;
      this.candidatRetenu = []
      console.log(this.candidatByOffreData)
   this.candidatOffreRetenu=[];
   this.candidatOffreTotal=[];

    },
      (error) => {
        console.log("error");
      })
  }
   getNbCandidatByOffre(jobOffre:any): number
  {
    for(let index=0;index<this.candidatOffreRetenu.length;index++)
    {
        console.log("---element---");
        console.log(this.candidatOffreRetenu[index].jobOffre.jobOffreId);
        console.log("---job offre---");
        console.log(jobOffre.jobOffreId);
        console.log("---index---");
        console.log(index);
        console.log("---test-----");
        console.log(this.candidatOffreRetenu[index].jobOffre.jobOffreId==jobOffre.jobOffreId);
        if(this.candidatOffreRetenu[index].jobOffre.jobOffreId==jobOffre.jobOffreId)
        {
          return index;
        }
      return -1;

    }
    // this.candidatOffreRetenu.forEach((element,index) => {
    //   console.log("---element---");
    //   console.log(element);
    //   console.log("---job offre---");
    //   console.log(jobOffre);
    //   console.log("---index---");
    //   console.log(index);
    //   if(element.jobOffre==jobOffre)
    //   {
    //     return index;
    //   }
    // });
    // return -1;
  }
  candidatFn() {
    this.getCandidatTotalByOffre();
  }
}