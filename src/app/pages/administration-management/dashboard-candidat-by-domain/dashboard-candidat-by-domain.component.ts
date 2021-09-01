import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-dashboard-candidat-by-domain',
  templateUrl: './dashboard-candidat-by-domain.component.html',
  styleUrls: ['./dashboard-candidat-by-domain.component.scss']
})
export class DashboardCandidatByDomainComponent implements OnInit {
  dataCandidat: any;
  labelsCandidat=[];
  datasetsCandidat=[];
  @ViewChild("linechart") chart: UIChart

  constructor(private utilsService: UtilsService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.dataCandidat = {
      title: {"text":""},
      labels: [],
      datasets: [
          {

              data: [],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]    
      };
      this.getCandidatByDomain();

  }
  getCandidatByDomain()
  {
     this.utilsService.get(UtilsService.API_STATISTIC+"/candidat").subscribe(data=>{
      console.log("----success----");
      console.log(data);
      data.forEach(element => {
        this.labelsCandidat.push(element.domaine.domaineLabel);
        this.datasetsCandidat.push(element.nbCandidat);
      });
      this.dataCandidat.labels=this.labelsCandidat;
      this.dataCandidat.datasets[0]["data"]=this.datasetsCandidat;
      this.chart.refresh();
      this.labelsCandidat=[];
      this.datasetsCandidat=[]
     },
     (error)=>{
     console.log("error");
     })
  }

}