import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';
import Swal from 'sweetalert2'
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { StageListComponent } from '../stage-list/stage-list.component';
import Calendar from '@fullcalendar/core/Calendar';
@Component({
  selector: 'ngx-details-offre',
  templateUrl: './details-offre.component.html',
  styleUrls: ['./details-offre.component.scss']
})
export class DetailsOffreComponent implements OnInit {

  @Input() job: any;
  isRh: any;
  user: any;
  trainee: any;
  candidate: any;
  isComplet: any;
  isCandidate: Boolean;
  isTrainee: Boolean;
  listCandidat: any = [];
  isJob: boolean = false;
  currentUserDetail = null;
  candidature: any = {
    "stagiaire": null,
    "candidat": null,
    "jobOffre": null,
    "candJbDate": null,
    "candJbEtat": null
  };
  @Output() cancelDetails = new EventEmitter<boolean>();
  @Output() cancelDetailsJob = new EventEmitter<boolean>();
  @Output() cancelCandidatures = new EventEmitter<boolean>();

  displayViewCv: boolean = false;
  currentUserCV: any;
  modalReserveRDV:any=false;
  modalReservePhoneRDV:any=false;
  dateMeeting:Date=new Date();
  datePhoneMeeting:Date=new Date();
  currentCand:any;
  constructor(private utilsService: UtilsService, private route: Router, private sanitizer: DomSanitizer, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.getCurrentUser();
    console.log("------candidature for current job-------");
    console.log(this.job);
    this.listCandidat=[];
    this.isJob = this.job.contractType != "STAGE";
    if (this.job.contractType != "STAGE") {
      this.job.candJobs.forEach(candJob => {
        this.listCandidat.push(candJob);
      });
    }
    if (this.job.contractType == "STAGE") {
      this.job.candJobs.forEach(candJob => {
        console.log("stageiare");
        this.listCandidat.push(candJob);
      });
    }
    console.log("----candidat job list -----");
    console.log(this.listCandidat);
  }

  postuler() {
    console.log("---postuler----")
    if (this.user.userRole === "CANDIDATE") {
      this.isComplet = this.verifCandidate();
      console.log("----this is complet-----");
      this.isCandidate = true;
      console.log(this.isComplet);
      console.log(this.user);
      console.log(this.candidate);
      if (this.isComplet == true) {
        this.getCandidat();
        this.candidature.candidat = this.user;
        this.candidature.jobOffre = this.job;
        this.candidature.jobOffre["candJobs"]=[];
        console.log("candidature à postuler");
        console.log(this.candidature);
        this.utilsService.post(UtilsService.API_CAND_JOB, this.candidature).subscribe((Response) => {
          console.log("----success-----");
          Swal.fire(
            'Candidature envoyée!',
            '',
            'success'
          )
          this.route.navigateByUrl("recruiting/administration/mes-offres")

        }, (error) => {
          console.log("----success-----");

          Swal.fire(
            'Candidature non envoyée!',
            '',
            'error'
          )
        })

      }
      else {
        Swal.fire('Compléter votre profil SVP!', '', 'warning')
        this.route.navigateByUrl("recruiting/administration/profil")
      }
    }
    else if (this.user.userRole === "TRAINEE") {
      this.isComplet = this.verifTrainee();
      console.log("----this is complet-----");
      this.isTrainee = true;
      console.log(this.isComplet);
      console.log(this.user);
      console.log(this.trainee);

      if (this.isComplet == true) {
        this.getTrainee();
        this.candidature.stagiaire = this.user;
        this.candidature.jobOffre = this.job;
        this.candidature.jobOffre["candJobs"]=[];
        console.log("candidature à postuler");
        console.log(this.candidature);
        this.utilsService.post(UtilsService.API_CAND_JOB, this.candidature).subscribe((Response) => {
          console.log("----success postule-----");
          Swal.fire(
            'Candidature envoyée!',
            '',
            'success'
          )
          this.route.navigateByUrl("recruiting/administration/mes-offres")

        }, (error) => {
          console.log("----success-----");
          Swal.fire(
            'Candidature non envoyée!',
            '',
            'error'
          )

        })
      }
      else {
        Swal.fire('Compléter votre profil SVP!', '', 'warning')
        this.route.navigateByUrl("recruiting/administration/profil")
      }
    }

  }
  editer() {
    this.cancelDetails.emit(true);
  }
  getCurrentUser() {
    this.utilsService.get(UtilsService.API_USER).subscribe(response => {
      this.user = response.userDto;
      this.candidate = response.candidatDto;
      this.trainee = response.stagiaireDto;
      console.log(this.user.userRole);
      if (this.user.userRole === "CANDIDATE") {
        this.isCandidate = true;

      }
      else if (this.user.userRole === "TRAINEE") {
        this.isTrainee = true;
      }
      if (this.user.userRole === "CANDIDATE" || this.user.userRole === "TRAINEE") {
        this.isRh = false;
      }
      else {
        this.isRh = true;
      }
      console.log("---roleUser---");
      console.log(this.isRh);

    }, error => {
      this.utilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement de l'utilisateur `);
    });
  }
  verifCandidate(): boolean {
   
     return this.verifUser() && this.candidate.candidatDiplome != null && this.candidate.candidatEcole != null && this.candidate.candidatAnneeDiplome != null
      && this.candidate.candidatNumberExperience != null && this.candidate.candidatFiliere != null;
  }
  verifTrainee(): boolean {
    return this.verifUser() && this.trainee.stagiaireEcole != null && this.trainee.stagiaireFuturDiplome != null && this.trainee.stagiaireNiveauEtude != null
      && this.trainee.stagiaireFiliere != null;
  }
  verifUser(): boolean {
    return this.user.userId != null && this.user.userFirstName != null && this.user.userLastName != null && this.user.userPictureUrl != null
      && this.user.userBirthDate != null && this.user.userBirthCity != null && this.user.userBirthCountry != null && this.user.userCvUrl != null && this.user.userNRue != null
      && this.user.userPays != null && this.user.userCity != null && this.user.userGender != null && this.user.userCivilStatus != null && this.user.userAddress != null
      && this.user.userEmail != null && this.user.userPhoneNumber != null && this.user.userLogin != null && this.user.userPassword != null && this.user.userRole != null;
  }
  getCandidat() {
    var candidateUser: any = this.user;
    candidateUser.candidatEcole = this.candidate.candidatEcole;
    candidateUser.candidatDiplome = this.candidate.candidatDiplome;
    candidateUser.candidatAnneeDiplome = this.candidate.candidatAnneeDiplome;
    candidateUser.candidatNumberExperience = this.candidate.candidatNumberExperience;
    candidateUser.candidatFiliere = this.candidate.candidatFiliere;
    this.user = candidateUser;
  }
  getTrainee() {
    var traineeUser: any = this.user;
    traineeUser.stagiaireEcole = this.trainee.stagiaireEcole;
    traineeUser.stagiaireFuturDiplome = this.trainee.stagiaireFuturDiplome;
    traineeUser.stagiaireNiveauEtude = this.trainee.stagiaireNiveauEtude;
    traineeUser.stagiaireFiliere = this.trainee.stagiaireFiliere;
    this.user = traineeUser;
  }
  visualiserCV(userCvUrl, userFirstName, userLastName) {
    console.log(userCvUrl);
    this.displayViewCv = true;
    this.currentUserCV = userCvUrl;
    this.currentUserDetail = "CV " + userFirstName + " " + userLastName;

  }
  reserverRDV(cand:any)
  {
    console.log("-----reserver RDV-----");
    this.modalReserveRDV=true;
    this.currentCand=cand;
  }
  reserverPhoneRDV(cand)
  {
    console.log("-----reserver RDV Phone-----");
    this.modalReservePhoneRDV=true;
    this.currentCand=cand;
  }
  effectuerPhoneRDV()
  {
    console.log("effectuer RDV")
    console.log(this.currentCand);
    console.log(this.datePhoneMeeting);
    let datePhoneMeeting= this.datePipe.transform(this.datePhoneMeeting,'yyyy-MM-dd HH:mm:ss');
    let url=UtilsService.API_CAND_JOB+"/update-phone-meeting/"+this.currentCand.idCandJob
    if(this.datePhoneMeeting!=null)
    {
      url=url+'?meetingPhoneDate='+datePhoneMeeting;
    }
    this.utilsService.post(url,null).subscribe(response => {
      this.ngOnInit();
      this.modalReservePhoneRDV=false;
      this.utilsService.showToast('success',
      'RDV effectuée',
      `RDV a été effectuée avec success`);
      this.cancelCandidatures.emit(true);
    }
    ,error=>{
      this.utilsService.showToast('danger',
      'Erreur interne',
      `Un erreur interne a été produit lors de la réservation téléphonique d\'un RDV`);
    });
  }
  effectuerRDV()
  {
    console.log("effectuer RDV")
    console.log(this.currentCand);
    console.log(this.dateMeeting);
    let dateMeeting= this.datePipe.transform(this.dateMeeting,'yyyy-MM-dd HH:mm:ss');
    let url=UtilsService.API_CAND_JOB+"/update/"+this.currentCand.idCandJob
    if(this.dateMeeting!=null)
    {
      url=url+'?meetingDate='+dateMeeting;
    }
    this.utilsService.post(url,null).subscribe(response => {
      this.ngOnInit();
      this.modalReserveRDV=false;
      this.utilsService.showToast('success',
      'RDV effectuée',
      `RDV a été effectuée avec success`);
      this.cancelCandidatures.emit(true);

    }
    ,error=>{
      this.utilsService.showToast('danger',
      'Erreur interne',
      `Un erreur interne a été produit lors de la réservation d\'un RDV`);
    });
  }
  AccepterCand(cand)
  {
    this.currentCand=cand;
    let url=UtilsService.API_CAND_JOB+"/accepted/"+this.currentCand.idCandJob
    url=url+'?etat='+true;
    this.utilsService.post(url,null).subscribe(response => {
      this.ngOnInit();
      this.utilsService.showToast('success',
      'Acceptation effectuée',
      `la candidature a été accepte avec success`);
      this.cancelCandidatures.emit(true);

    }
    ,error=>{
      this.utilsService.showToast('danger',
      'Erreur interne',
      `Un erreur interne a été produit lors de l\'acceptation du candidature`);
    });

  }
  AnnuluerAccepterCand(cand)
  {
    this.currentCand=cand;
    let url=UtilsService.API_CAND_JOB+"/accepted/"+this.currentCand.idCandJob
    url=url+'?etat='+false;
    this.utilsService.post(url,null).subscribe(response => {
      this.ngOnInit();
      this.utilsService.showToast('success',
      'annuluation de l\'acceptation a été effectuée',
      `la candidature a été annuluer avec success`);
      this.cancelCandidatures.emit(true);
    }
    ,error=>{
      this.utilsService.showToast('danger',
      'Erreur interne',
      `Un erreur interne a été produit lors de l\'annulation dde l\'acceptation candidature`);
    });


  }

  RefuserCand(cand)
  {
    this.currentCand=cand;
    let url=UtilsService.API_CAND_JOB+"/refused/"+this.currentCand.idCandJob
    url=url+'?etat='+false;
    this.utilsService.post(url,null).subscribe(response => {
      this.ngOnInit();
      this.utilsService.showToast('success',
      'le refus a été effectuée',
      ` le refus a été effectuée avec success`);
      this.cancelCandidatures.emit(true);
    }
    ,error=>{
      this.utilsService.showToast('danger',
      'Erreur interne',
      `Un erreur interne a été produit lors du refus `);
    });

  }
  AnnuluerRefuserCand(cand)
  {
    this.currentCand=cand;
    let url=UtilsService.API_CAND_JOB+"/refused/"+this.currentCand.idCandJob
    url=url+'?etat='+true;
    this.utilsService.post(url,null).subscribe(response => {
      this.ngOnInit();
      this.utilsService.showToast('success',
      'le refus a été annuler',
      ` le refus a été annuluer avec success`);
      this.cancelCandidatures.emit(true);
    }
    ,error=>{
      this.utilsService.showToast('danger',
      'Erreur interne',
      `Un erreur interne a été produit lors du refus `);
    });

  }
  redirect()
  {
    this.cancelDetails.emit(true);
  }
  retourStage(){
    this.cancelDetailsJob.emit(true);

    
  }
  retourJob(){
    this.cancelDetailsJob.emit(true);


  }
}
