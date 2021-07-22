import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Util } from 'leaflet';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-list-candidat',
  templateUrl: './list-candidat.component.html',
  styleUrls: ['./list-candidat.component.scss']
})
export class ListCandidatComponent implements OnInit {
  listCandidat: any;
  showCandidatWindow:boolean=false;
  displayViewCv: boolean = false;
  currentUserCV: any;
  currentUserDetail = null;
  currentUser :any;
  displayDeleteUser = false;
  user = null;

  constructor(private utilsService: UtilsService, private datePipe: DatePipe,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initUser();
    this.getAllCandidats();
  }
  getAllCandidats() {
    this.utilsService.get(UtilsService.API_CANDIDATE).subscribe((response) => {
     this.listCandidat = response;
     console.log(this.listCandidat)
    }, (error) => {
      this.utilsService.showToast(
        "danger",
        "Erreur interne",
        `Un erreur interne a été produit lors du chargement des candidats`
      );
    })
  }
  visualiserCV(userCvUrl, userFirstName, userLastName) {
    console.log(userCvUrl);
    this.displayViewCv = true;
    this.currentUserCV = userCvUrl;
    this.currentUserDetail = "CV " + userFirstName + " " + userLastName;

  }


  delUser() {
    const context = this;
    const url = UtilsService.API_USER + '/' + this.currentUser.userId;
    this.utilsService.delete(`${UtilsService.API_RH}/${this.currentUser.userId}`).subscribe( response => {
        this.utilsService.showToast('success',
          'Utilisateur supprimé avec succés',
          `L'utilisateur'  ${this.currentUser.userLogin} a été supprimé avec succcés`);
        context.getAllCandidats();
        context.displayDeleteUser = false;
      },
      error => {this.utilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression d'utilisateur ${this.currentUser.userLogin}`);
        context.displayDeleteUser = false;
      });


  }

  deleteUser(user) {
   this.currentUser = user;
   this.displayDeleteUser = true;

  }




 async saveNewUser(userObject) {
    const context = this;
    this.user=userObject.user;
      try {
        let response: any = await this.utilsService.post(UtilsService.API_CANDIDATE, this.user).toPromise();
        console.log(response)
        this.user=response;
        if(userObject.userPicture!=null){
         await this.saveUserPicture(response.userId, userObject.userPicture);
        }
        if(userObject.userCvUrl!=null){
         await this.saveUserCV(response.userId, userObject.userCvUrl);
        }
        if ( this.user.userId == null) {
          this.utilsService.showToast('success',
            'Un Candidat ajouté avec succés',
            `Le candidat'  ${this.user.userFirstName} ${this.user.userlastName} a été ajouté avec succcés`);
        } else {
          this.utilsService.showToast('success',
            'Un candidat modfié avec succés',
            `Le candidat  ${this.user.userFirstname} ${this.user.userlastName} a été modifié avec succcés`);
        }

        this.hideUserWindow();
        this.getAllCandidats();
        this.initUser();

      }
      catch (e) {
        if ( this.user.userId == null) {
          this.utilsService.showToast('danger',
          'Erreur interne',
            `Un erreur interne a été produit lors de la persistence du candidat ${this.user.userFirstName} ${this.user.userlastName}`);
        }else{
          this.utilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de la modification du profil candidat  ${this.user.userFirstName} ${this.user.userLastName}`);

        }

      } }


  saveUserPicture(userId,userPicture) {
    const formData = new FormData();
    formData.append('file', userPicture);
    this.utilsService.post(UtilsService.API_USER_FILE + '/ADD_USER_PICTURE_CONTEXT/' + userId, formData).subscribe(response => {
    }, error => {

    });
  }

  saveUserCV(userId,currentFileCV) {
    const formData = new FormData();
    formData.append('file', currentFileCV);
    this.utilsService.post(UtilsService.API_USER_FILE + '/ADD_CV_CONTEXT/' + userId, formData).subscribe(response => {
    }, error => {
    });
  }
  initUser()
  {
    this.user = {
      userId: null,
      userFirstName: null,
      userLastName: null,
      userPictureUrl: null,
      userBirthDate: null,
      userGender: 'MONSIEUR',
      userBirthCountry: null,
      userBirthCity: null,
      userNRue: null,
      userPays: null,
      userCity: null,
      userEmail: null,
      userPhoneNumber: null,
      userLogin: null,
      userPassword:null,
      userCivilStatus: 'CELIBATAIRE',
      createdAt: null,
      updatedAt: null,
      userCvUrl: null,
      candidatEcole: "",
      candidatDiplome: "",
      candidatAnneeDiplome: null,
      candidatNumberExperience: null,
      candidatFiliere: [],
    };
  }

  hideUserWindow() {
    this.showCandidatWindow = false;
  }

  editUser(user)
  {
    this.user=user;
    this.showCandidatWindow=true;
  }
}