import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-list-trainee',
  templateUrl: './list-trainee.component.html',
  styleUrls: ['./list-trainee.component.scss']
})
export class ListTraineeComponent implements OnInit {
  listTrainee:any;
  showTraineeWindow:boolean=false;
  displayViewCv: boolean = false;
  currentUserCV: any;
  currentUserDetail = null;
  currentUser :any;
  displayDeleteUser = false;
  user = null;
  constructor(private utilsService: UtilsService, private datePipe: DatePipe,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initUser();
    this.getAllTrainee();
  }
  getAllTrainee() {
    this.utilsService.get(UtilsService.API_TRAINEER).subscribe((response) => {
      this.listTrainee = response;
      console.log(this.listTrainee);
    }, (error) => {
      this.utilsService.showToast(
        "danger",
        "Erreur interne",
        `Un erreur interne a été produit lors du chargement des stagiaires`
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
    this.utilsService.delete(`${UtilsService.API_USER}/${this.currentUser.userId}`).subscribe( response => {
        this.utilsService.showToast('success',
          'Utilisateur supprimé avec succés',
          `L'utilisateur'  ${this.currentUser.userLogin} a été supprimé avec succcés`);
        context.getAllTrainee();
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
      let response: any = await this.utilsService.post(UtilsService.API_TRAINEER, this.user).toPromise();
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
          'Un Stagiaire ajouté avec succés',
          `Le stagiaire'  ${this.user.userFirstName} ${this.user.userlastName} a été ajouté avec succcés`);
      } else {
        this.utilsService.showToast('success',
          'Un stagiaire modfié avec succés',
          `Le stagiaire  ${this.user.userFirstname} ${this.user.userlastName} a été modifié avec succcés`);
      }
      this.hideUserWindow();
      this.getAllTrainee();
      this.initUser();
    }
    catch (e) {
      if ( this.user.userId == null) {
        this.utilsService.showToast('danger',
        'Erreur interne',
          `Un erreur interne a été produit lors de la persistence du stagiaire ${this.user.userFirstName} ${this.user.userlastName}`);
      }else{
        this.utilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la modification du profil stagiaire  ${this.user.userFirstName} ${this.user.userLastName}`);

      }

    }
  }


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
      userPassword: null,
      userCivilStatus: 'CELIBATAIRE',
      createdAt: null,
      updatedAt: null,
      userCvUrl: null,
      stagiaireEcole: "",
      stagiaireFuturDiplome: "",
      stagiaireNiveauEtude: "",
      stagiaireFiliere: [],
    };

  }

  hideUserWindow() {
    this.showTraineeWindow = false;
  }


  editUser(user)
  {
    this.user=user;
    this.showTraineeWindow=true;
  }
}