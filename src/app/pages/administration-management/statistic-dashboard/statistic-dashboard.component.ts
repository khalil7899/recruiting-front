import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-statistic-dashboard',
  templateUrl: './statistic-dashboard.component.html',
  styleUrls: ['./statistic-dashboard.component.scss']
})
export class StatisticDashboardComponent implements OnInit {
  dataJob: any;
  labelsJob=[];
  datasetsJob=[];
  dataStage: any;
  labelsStage=[];
  datasetsStage=[];
  @ViewChild("linechart1") chart1: UIChart
  @ViewChild("linechart2") chart2: UIChart

  constructor(private utilsService: UtilsService, private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.dataJob = {
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
      this.dataStage = {
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
      this.getJobByDomain();
      this. getStageByDomain();
  }
  getJobByDomain()
  {
     this.utilsService.get(UtilsService.API_STATISTIC+"/job").subscribe(data=>{
      console.log("----success----");
      console.log(data);
      data.forEach(element => {
        this.labelsJob.push(element.domaine.domaineLabel);
        this.datasetsJob.push(element.nbJob);
      });
      this.dataJob.labels=this.labelsJob;
      this.dataJob.datasets[0]["data"]=this.datasetsJob;
      this.chart1.refresh();

      this.labelsJob=[];
      this.datasetsJob=[]
     },
     (error)=>{
     console.log("error");
     })
  }
  getStageByDomain()
  {
     this.utilsService.get(UtilsService.API_STATISTIC+"/stage").subscribe(data=>{
      console.log("----success----");
      console.log(data);
      data.forEach(element => {
        this.labelsStage.push(element.domaine.domaineLabel);
        this.datasetsStage.push(element.nbJob);
      });
      this.dataStage.labels=this.labelsStage;
      this.dataStage.datasets[0]["data"]=this.datasetsStage;
      this.chart2.refresh();
      this.labelsStage=[];
      this.datasetsStage=[]
     },
     (error)=>{
     console.log("error");
     })
  }

}