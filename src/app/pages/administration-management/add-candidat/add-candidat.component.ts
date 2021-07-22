import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-add-candidat',
  templateUrl: './add-candidat.component.html',
  styleUrls: ['./add-candidat.component.scss']
})
export class AddCandidatComponent implements OnInit {


  emailtouch = false;
  @Input()  user = {
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
  isRh: any;
  filiereList: any;
  fileName = null;
  currentFileCV: File;
  isAdmin: any;
  @Output() addNewUserEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  constructor(private sanitizer: DomSanitizer, private utilsService: UtilsService, private router: Router) { }
  cities: Array<any>;
  cities_: Array<any>;
  changeCountry(count) {
    this.cities = this.worldMapData.getAllStatesFromCountry(count);

  }
  changeCountry_(count) {
    this.cities_ = this.worldMapData.getAllStatesFromCountry(count);

  }


  ngOnInit(): void {
    this.getAllFilieres();
    this.imgURL2 = this.user.userPictureUrl;
    if (this.imgURL2 == null || this.imgURL2 === '') {
      this.imgURL = './../../assets/images/user.jpg';
    }
    else {
      this.imgURL = null;
    }
  }

   saveUser() {

    const userObject = {
      user: this.user,
      userPicture: this.userPicture,
      userCvUrl: this.currentFileCV
    }
    this.addNewUserEvent.emit(userObject);
  }

  cancel() {
    this.cancelEvent.emit();
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
        this.imgURL = null;
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
    this.user.userPassword = makeid(8);
  }
  checkemailValid() {
  }

  compareFiliere(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a.domaineId === b.domaineId;
  }

  telInputObject($event) {
  }
  hasError($event) {
    this.CheckTelHasError = $event;

  }

  getNumber($event) {
    this.phone = $event;
  }
  checkMail() {
    this.checkEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.user.userEmail);
  }
  onCountryChange($event) {
    this.user.userPhoneNumber = null;

    this.CheckTelHasError = true;
  }
}