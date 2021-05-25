import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { UtilsService } from '../../../services/utils.service';
import { DatePipe } from '@angular/common';
// import {FullCalendar} from 'primeng/fullcalendar';

@Component({
  selector: 'ngx-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {

  events: any[];
  options: any;
  idUser: any;
  isTrainee:boolean=false;
  isCandidate:boolean=false;
  roleUser: any;
  candJobs:any;
  constructor(private utilsService: UtilsService, private datePipe:DatePipe) {

  }

  ngOnInit(): void {
    this.roleUser = localStorage.getItem("userRole");
    this.isCandidate = this.roleUser === "CANDIDATE";
    this.isTrainee = this.roleUser === "TRAINEE";
    this.events = [];
    this.getCurrentUser();
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2021-02-01',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true
    };

  }

  getCurrentUser() {

    this.utilsService.get(UtilsService.API_USER).subscribe(response => {
      if (response != null && response.userDto != null) {
        this.idUser = response.userDto.userId;
        if (this.idUser != null && this.isCandidate != null && this.isCandidate==true) {
          this.utilsService.get(UtilsService.API_CAND_JOB+"/getcandjobcandidat/"+this.idUser).subscribe(response => {
             this.candJobs=response;
             console.log("-------cand jobs candidat-------");
             console.log(this.candJobs);
             let newEvents=[];
             this.candJobs.forEach(element => {
               if(element.meetingDate!=null)
               {
               let event={
                 "title":"RDV",
                  "start":this.datePipe.transform(element.meetingDate,"yyyy-MM-dd HH:mm:ss")
               }
               newEvents.push(event);

             }
             });
             this.events=[...newEvents];
          }, error => {

          });
        }
        else if (this.idUser != null && this.isTrainee != null && this.isTrainee==true) {
          this.utilsService.get(UtilsService.API_CAND_JOB+"/getcandjobstagiaire/"+this.idUser).subscribe(response => {
            this.candJobs=response;
            console.log("-------cand jobs stagiaire-------");
            console.log(this.candJobs);
            let newEvents=[];
            this.candJobs.forEach(element => {
              if(element.meetingDate!=null)
              {
              let event={
                "title":"RDV",
                 "start":this.datePipe.transform(element.meetingDate,"yyyy-MM-dd HH:mm:ss")
              }
              newEvents.push(event);

            }
            });
            this.events=[...newEvents];

          }, error => {

          });

        }
      }
    }, error => {
      this.utilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement de l'utilisateur `);
    });
  }

}