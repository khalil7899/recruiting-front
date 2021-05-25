import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  emailtouch = false;
  user = {
    userId: null,
    userFirstName: null,
    userLastName: null,
    userPictureUrl: null,
    userBirthDate: null,
    userGender: null,
    userBirthCountry: null,
    userBirthCity: null,
    userNRue: null,
    userPays: null,
    userCity: null,
    userEmail: null,
    userPhoneNumber: null,
    // userLogin: null,
    userCivilStatus: null,
    createdAt: null,
    updatedAt: null,
    userCvUrl:null,
  };
  candidate: any = {
    candidatEcole: "",
    candidatDiplome: "",
    candidatAnneeDiplome: null,
    candidatNumberExperience: null,
    candidatFiliere: [],
  };
  trainee: any = {
    stagiaireEcole: "",
    stagiaireFuturDiplome: "",
    stagiaireNiveauEtude: "",
    stagiaireFiliere: [],
  }
  imagePath;
  imgURL = null;
  userPicture = null;
  messageUserPictureErrorType = 'seulement les fichiers de type image sont autorisés!'
  showerrorTypeUserPicture = false;


  worldMapData = require('city-state-country');
  countriesList = this.worldMapData.getAllCountries();
  checkEmail;

  CheckTelHasError;
  imgURL2: string | ArrayBuffer;
  phone: any;
  companies: any[];
  businessUnit: any[];
  roleUser: any;
  isCandidate: any;
  isTrainee: any;
  isRh:any;
  filiereList: any;
  fileName = null;
  currentFileCV: File;
  isAdmin:any;

  constructor(private sanitizer: DomSanitizer, private utilsService: UtilsService, private router: Router) {
    this.roleUser = localStorage.getItem("userRole");
    console.log("------role user-----" + this.roleUser);
    console.log(this.roleUser === "CANDIDATE");
    this.isCandidate = this.roleUser === "CANDIDATE";
    this.isTrainee = this.roleUser === "TRAINEE";
    this.isAdmin=this.roleUser === "ADMINISTRATOR";
    this.isRh=this.roleUser === "RH";
  }

  

  cities: Array<any>;
  cities_: Array<any>;
  changeCountry(count) {
    this.cities = this.worldMapData.getAllStatesFromCountry(count);

  }
  changeCountry_(count) {
    this.cities_ = this.worldMapData.getAllStatesFromCountry(count);

  }

  ngOnInit() {
    this.getAllFilieres();
    this.getCurrentUser()

    if (this.user.userId != null) {

    }
    this.changeCountry(this.user.userBirthCountry);
    this.changeCountry_(this.user.userPays);
    if (this.user.userId == null) {
      this.changeCountry('Tunisia');

      this.user.userBirthCity = this.cities[0].name;

      this.changeCountry_('Tunisia');
      this.user.userCity = this.cities_[0].name;
    }
    this.imgURL2 = this.user.userPictureUrl;
    if (this.imgURL2 == null || this.imgURL2 === '') {
      this.imgURL = './../../assets/images/user.jpg';
    }
    else {
      this.imgURL = null;
    }
  }
  getCurrentUser() {
    this.utilsService.get(UtilsService.API_USER).subscribe(response => {
      if (response != null && response.userDto != null) {
        this.user = response.userDto;
        this.imgURL2 = this.user.userPictureUrl;
        if (this.imgURL2 == null || this.imgURL2 === '') {
          this.imgURL = './../../assets/images/user.jpg';
        }
        else {
          this.imgURL = null;
        }
      }
      if (response != null && response.stagiaireDto != null) {
        this.trainee = response.stagiaireDto;
      }
      if (response != null && response.candidatDto != null) {
        this.candidate = response.candidatDto;
      }
      console.log("----current user----");
      console.log(this.user);
      console.log("----current candidate----");
      console.log(this.candidate);
      console.log("----current stagiaire----");
      console.log(this.trainee);
    }, error => {
      this.utilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du chargement de l'utilisateur `);
    });
  }

  saveUser() {
    if (this.isTrainee) {
      var traineeUser: any = this.user;
      traineeUser.stagiaireEcole = this.trainee.stagiaireEcole;
      traineeUser.stagiaireFuturDiplome = this.trainee.stagiaireFuturDiplome;
      traineeUser.stagiaireNiveauEtude = this.trainee.stagiaireNiveauEtude;
      traineeUser.stagiaireFiliere = this.trainee.stagiaireFiliere;
      this.user = traineeUser;
      this.saveTraineer(this.user);
    }
    else if (this.isCandidate) {
      var candidateUser: any = this.user;
      candidateUser.candidatEcole = this.candidate.candidatEcole;
      candidateUser.candidatDiplome = this.candidate.candidatDiplome;
      candidateUser.candidatAnneeDiplome = this.candidate.candidatAnneeDiplome;
      candidateUser.candidatNumberExperience = this.candidate.candidatNumberExperience;
      candidateUser.candidatFiliere = this.candidate.candidatFiliere;
      this.user = candidateUser;
      this.saveCandidate(this.user);
    }
    const userObject = {
      user: this.user,
      userPicture: this.userPicture,
      userCV: this.currentFileCV
    }
    console.log("------user to update----");
    console.log(this.user);

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
  cancel() {
       this.redirectAccueil();
  }
  selectFile(event) {
    this.currentFileCV = event.target.files.item(0);
    this.user.userCvUrl = this.currentFileCV.name;
  }
  checkUserValid(): boolean {
    return
    this.user.userFirstName == null || this.user.userFirstName === '' &&
      this.user.userLastName == null || this.user.userLastName === '' &&
      this.user.userBirthDate == null || this.user.userBirthDate === '' &&
      this.user.userGender == null || this.user.userGender === '' &&
      this.user.userBirthCountry == null || this.user.userBirthCountry === '' &&
      this.user.userBirthCity == null || this.user.userBirthCity === '' &&
      this.user.userNRue == null || this.user.userNRue === '' &&
      this.user.userPays == null || this.user.userPays === '' &&
      this.user.userCity == null || this.user.userCity === '' &&
      this.user.userEmail == null || this.user.userEmail === '' &&
      this.user.userPhoneNumber == null || this.user.userPhoneNumber === ''

  }
  preview(files) {

    if (files.length === 0) {
      return;
    }
    this.userPicture = files[0];
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.showerrorTypeUserPicture = true;
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      if (this.user.userPictureUrl != null) {
        this.imgURL=null;
        this.imgURL2 = reader.result

      } else {
        this.imgURL = reader.result;
      }
    };
  }
  generatePassword() {
    function makeid(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
  }
  checkemailValid() {


  }
  initUser() {
    this.user = {
      userId: null,
      userFirstName: null,
      userLastName: null,
      userPictureUrl: null,
      userBirthDate: null,
      userGender: null,
      userBirthCountry: null,
      userBirthCity: null,
      userNRue: null,
      userPays: null,
      userCity: null,
      userEmail: null,
      userPhoneNumber: null,
      userCivilStatus: null,
      createdAt: null,
      updatedAt: null,
      userCvUrl:null,
    };
  }
  checkMail() {
    this.checkEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.user.userEmail);
  }
  onCountryChange($event) {
    this.user.userPhoneNumber = null;

    this.CheckTelHasError = true;
  }
  telInputObject($event) {
  }
  hasError($event) {
    this.CheckTelHasError = $event;

  }
  getNumber($event) {
    this.phone = $event;
  }

  compareFiliere(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a.domaineId === b.domaineId;
  }



  async saveCandidate(candidate) {
    try {
      let response: any = await this.utilsService.put(UtilsService.API_CANDIDATE, candidate).toPromise();
      console.log("----response----");
      console.log(response)
      if (this.currentFileCV != null) {
        console.log("-----cv------");
        await this.saveUserCV(response.userId);
      }
      if (this.userPicture != null) {
        console.log("-----picture------");
        await this.saveUserPicture(response.userId);
      }
      this.utilsService.showToast('success',
        'Candidat modifié avec succés',
        `Candidat  ${this.user.userFirstName} ${this.user.userLastName} a été modifié avec succcés`);
        this.redirectAccueil();

    }
    catch (e) {
      this.utilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la modification du profil candidat  ${this.user.userFirstName} ${this.user.userLastName}`);

    }
           


  }

  async saveTraineer(traineer) {
    try {
      let response = await this.utilsService.put(UtilsService.API_TRAINEER, traineer).toPromise();
      if (this.currentFileCV != null) {
        await this.saveUserCV(response.userId);
      } 
      if (this.userPicture != null) {
        await this.saveUserPicture(response.userId);
      }
      this.utilsService.showToast('success',
      'Candidat modifié avec succés',
        `Candidat  ${this.user.userFirstName} ${this.user.userLastName} a été modifié avec succcés`);
     this.redirectAccueil();
}
      catch(e) {
        this.utilsService.showToast('danger',
         'Erreur interne',
         `Un erreur interne a été produit lors de la modification du profil candidat  ${this.user.userFirstName} ${this.user.userLastName}`);

        }


  }


  saveUserPicture(userId) {
    const formData = new FormData();
    formData.append('file', this.userPicture);
    this.utilsService.post(UtilsService.API_USER_FILE + '/ADD_USER_PICTURE_CONTEXT/' + userId, formData).subscribe(response => {

    }, error => {
    });
  }

  saveUserCV(userId) {
    const formData = new FormData();
    formData.append('file', this.currentFileCV);
    this.utilsService.post(UtilsService.API_USER_FILE + '/ADD_CV_CONTEXT/' + userId, formData).subscribe(response => {
      
    }, error => {

    });
  }

  redirectAccueil()
  {
   if (this.isCandidate == true) {
     this.router.navigateByUrl("/recruiting/administration/job-list");
   }
   else if (this.isTrainee==true) {
     this.router.navigateByUrl("/recruiting/administration/stages-list");

   }
   else if (this.isRh==true) {
     this.router.navigateByUrl("/recruiting/administration/job-list");

    }
   else if (this.isAdmin == true) {
     this.router.navigateByUrl("/recruiting/administration/job-list");

    }
  }

}