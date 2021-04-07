import { Component, OnInit } from '@angular/core';
//import {DialogService} from 'primeng/dynamicdialog';
import { UtilsService } from "./../../../services/utils.service";
import { DatePipe } from '@angular/common';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'ngx-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users: any[];
  loading = false;
  showUserWindow = false;
  user = null;
  displayDeleteUser = false;
  pipe = new DatePipe('en-US');
  mySimpleFormat;
  displayBlockUser=false;
  displayActifUser=false;
  constructor(private UtilsService: UtilsService,private sanitizer: DomSanitizer) {

  }

  
  ngOnInit(): void {
    this.initUser();
     this.getAllUsers();
  }

  saveNewUser(userObject) {
    const context = this;
    this.user=userObject.user;
    this.user.isBlocked=false;
    delete this.user.company.createdAt;

    delete this.user.company.updatedAt;
    /*this.mySimpleFormat = this.pipe.transform(this.user.userBirthDate, 'dd-MM-yyyy');
    this.user.userBirthDate= this.mySimpleFormat;
    this.mySimpleFormat =   this.pipe.transform(this.user.userHirringDate, 'dd-MM-yyyy');
    this.user.userHirringDate = this.mySimpleFormat;*/
    this.UtilsService.post(UtilsService.API_USER, this.user).subscribe( response => {
       if(userObject.userPicture!=null){
        this.saveUserPicture(response.userId, userObject.userPicture);
       }else{
        this.hideUserWindow();
        this.getAllUsers();
        this.initUser();
        if ( this.user.userId == null) {
          this.UtilsService.showToast('success',
            'Utilisateur ajouté avec succés',
            `L'utlisateur'  ${this.user.userLogin} a été ajouté avec succcés`);
        } else {
          this.UtilsService.showToast('success',
            'Utilisateur modfié avec succés',
            `L'utlisateur  ${this.user.userLogin} a été modifié avec succcés`);
        }
       } 
      
      },
      error => {
        console.log(error);
        this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la sauvegarde du utilisateur ${this.user.userLogin}`); });

  }
  saveUserPicture(userId, userPicture) {
    const formData = new FormData();
    formData.append('file', userPicture);
    this.UtilsService.post(UtilsService.API_USER_FILE + '/ADD_USER_PICTURE/' + userId, formData).subscribe(response => {
      this.hideUserWindow();
      if ( this.user.userId == null) {
        this.UtilsService.showToast('success',
          'Utilisateur ajouté avec succés',
          `L'utlisateur'  ${this.user.userLogin} a été ajouté avec succcés`);
      } else {
        this.UtilsService.showToast('success',
          'Utilisateur modfié avec succés',
          `L'utlisateur  ${this.user.userLogin} a été modifié avec succcés`);
      }
          
      this.getAllUsers();
      this.initUser();
    },  error => {this.UtilsService.showToast('danger',
    'Erreur interne',
    `Un erreur interne a été produit lors de la sauvegarde du utilisateur ${this.user.userLogin}`); });
}

  getAllUsers() {

    const context = this;
    this.UtilsService.get(UtilsService.API_USER).subscribe( response => {
        context.users = response;
        },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des utilisateurs`);
      });

  }
  editUser(user) {
    if(!user.isBlocked){
    this.user = user;
    this.showUserWindow = true;
    }
  }

  delUser() {
    const context = this;
    const url = UtilsService.API_USER + '/' + this.user.userId;
    this.UtilsService.delete(`${UtilsService.API_USER}/${this.user.userId}`).subscribe( response => {
        context.users = response;
        this.UtilsService.showToast('success',
          'Utilisateur supprimé avec succés',
          `L'utilisateur'  ${this.user.userLogin} a été supprimé avec succcés`);
        context.getAllUsers();
        context.initUser();
        context.displayDeleteUser = false;
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression d'utilisateur ${this.user.userLogin}`);
        context.displayDeleteUser = false;
      });


  }

  deleteUser(user) {
   this.user = user;
   this.displayDeleteUser = true;

  }

  hideUserWindow() {
    this.showUserWindow = false;
  }

  initUser() {
    this.user = {
      userId: null,
      userRegistrationNumber: null,
      userFirstName: null,
      userLastName: null,
      userPictureUrl: null,
      userBirthDate: null,
      userGender: 'MONSIEUR',
      userBirthCountry: 'Tunisia',
      userBirthCity: null,
      userHirringDate: null,
      userNRue: null,
      userPays: 'Tunisia',
      userCity: null,
      userEmail: null,
      userPhoneNumber: null,
      userLogin: null,
      userPassword: null,
      userCivilStatus: 'CELIBATAIRE',
      isBlocked: null,
      userTypeContract:'STAGE',
      company:null,
      businessUnit: null,
      rhRang: null,
    };
  }
bloquerUser(user){
  
    this.user=user;
  this.displayBlockUser=true;
 
}
  
  blockUser(){
    this.UtilsService.put(UtilsService.API_USER+'/blockuser/'+this.user.userId,null).subscribe(response => {
      this.hideUserWindow();
      this.displayBlockUser=false;
        this.UtilsService.showToast('success',
          'Utilisateur bloqué avec succés',
          `L'utlisateur  ${this.user.userLogin} a été bloqué avec succcés`);
     
          
      this.getAllUsers();
      this.initUser();
    },  error => {this.UtilsService.showToast('danger',
    'Erreur interne',
    `Un erreur interne a été produit lors du blocage du utilisateur ${this.user.userLogin}`); });
}
checkBlockUser(user){
  return user.isBlocked;
}
activerUser(user){
  this.user=user;
  this.displayActifUser=true;
}
ActifUser(){
  this.UtilsService.put(UtilsService.API_USER+'/actifuser/'+this.user.userId,null).subscribe(response => {
    this.hideUserWindow();
    this.displayActifUser=false;
      this.UtilsService.showToast('success',
        'Utilisateur activé avec succés',
        `L'utlisateur  ${this.user.userLogin} a été activé avec succcés`);
   
        
    this.getAllUsers();
    this.initUser();
  },  error => {this.UtilsService.showToast('danger',
  'Erreur interne',
  `Un erreur interne a été produit lors d'activer  l'utilisateur ${this.user.userLogin}`); });
}
}
