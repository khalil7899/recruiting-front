import { BusinessUnit } from './../../../models/BusinessUnit.model';
import { Company } from './../../../models/Company.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { UtilsService } from "./../../../services/utils.service";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'ngx-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  emailtouch = false;
  @Input() user = {
    userId: null,
    userRegistrationNumber: null,
    userFirstName: null,
    userLastName: null,
    userPictureUrl: null,
    userBirthDate: null,
    userGender: null,
    userBirthCountry: null,
    userBirthCity: null,
    userHirringDate: null,
    userNRue: null,
    userPays: null,
    userCity: null,
    userEmail: null,
    userPhoneNumber: null,
    userLogin: null,
    userPassword: null,
    userCivilStatus: null,
    isBlocked: null,
    createdAt: null,
    updatedAt: null,
    userTypeContract:null,
    company:null,
    businessUnit: null,
    rhRang: null,

  };
  imagePath;
  imgURL = null;
  userPicture = null;
  messageUserPictureErrorType = 'seulement les fichiers de type image sont autorisés!'
  showerrorTypeUserPicture = false;


  @Output() addNewUserEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  worldMapData = require('city-state-country');
  countriesList = this.worldMapData.getAllCountries();
  checkEmail;

  CheckTelHasError;
  imgURL2: string | ArrayBuffer;
  phone: any;
  companies: any[];
  businessUnit : any[] ;
  constructor(private sanitizer: DomSanitizer,   private utilsService : UtilsService) { }

  cities: Array<any>;
  cities_: Array<any>;
  changeCountry(count) {
    this.cities = this.worldMapData.getAllStatesFromCountry(count);

  }
  changeCountry_(count) {
    this.cities_ = this.worldMapData.getAllStatesFromCountry(count);

  }

  ngOnInit(): void {
    if(this.user.userId!=null){
      
    }
    this.changeCountry(this.user.userBirthCountry);
    this.changeCountry_(this.user.userPays);
    if(this.user.userId==null){
      this.changeCountry('Tunisia');
      
    this.user.userBirthCity=this.cities[0].name;

    this.changeCountry_('Tunisia');
    this.user.userCity=this.cities_[0].name;
  }
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
      userPicture: this.userPicture
    }
    this.addNewUserEvent.emit(userObject);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  checkUserValid(): boolean {
    return this.user.userRegistrationNumber == null || this.user.userRegistrationNumber === '' &&
      this.user.userFirstName == null || this.user.userFirstName === '' &&
      this.user.userLastName == null || this.user.userLastName === '' &&
      this.user.userBirthDate == null || this.user.userBirthDate === '' &&
      this.user.userGender == null || this.user.userGender === '' &&
      this.user.userBirthCountry == null || this.user.userBirthCountry === '' &&
      this.user.userBirthCity == null || this.user.userBirthCity === '' &&
      this.user.userHirringDate == null || this.user.userHirringDate === '' &&
      this.user.userNRue == null || this.user.userNRue === '' &&
      this.user.userPays == null || this.user.userPays === '' &&
      this.user.userCity == null || this.user.userCity === '' &&
      this.user.userEmail == null || this.user.userEmail === '' &&
      this.user.userPhoneNumber == null || this.user.userPhoneNumber === '' &&
      this.user.userPassword == null || this.user.userPassword === '';

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
  initUser() {
    this.user = {
      userId: null,
      userRegistrationNumber: null,
      userFirstName: null,
      userLastName: null,
      userPictureUrl: null,
      userBirthDate: null,
      userGender: null,
      userBirthCountry: null,
      userBirthCity: null,
      userHirringDate: null,
      userNRue: null,
      userPays: null,
      userCity: null,
      userEmail: null,
      userPhoneNumber: null,
      userLogin: null,
      userPassword: null,
      userCivilStatus: null,
      isBlocked: null,
      createdAt: null,
      updatedAt: null,
      userTypeContract:null,
      company:null,
      businessUnit: null,
      rhRang: null,
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
    this.phone= $event;
  }
  
  compareCompany(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a.companyId === b.companyId;
  }
  compareBusinessUnit(a: any, b: any): boolean {
    if (a == null || b == null) return true;
    return a.businessUnitId  === b.businessUnitId ;
  }
  
  

}
