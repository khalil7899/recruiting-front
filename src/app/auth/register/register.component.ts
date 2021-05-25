import { BehaviorSubject } from 'rxjs';
import { AuthServiceService } from './../../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { JwtResponse } from './../../models/JwtResponse.model';
import { LoginRequest } from './../../models/LoginRequest.model';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { User } from '../../models/User.model';
import { Filiere } from '../../models/Filiere.model';


@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class NgxRegisterComponent implements OnInit{
  user: User = new User()

  filiere: Filiere = new Filiere()
  checkEmail;
  phone: any;
  role: string
  CheckTelHasError;
  worldMapData = require('city-state-country');
  countriesList = this.worldMapData.getAllCountries();
  section :any='1'
  // section:string='1'
  sections:any=[]
  loginRequest: LoginRequest;
  cities: Array<any>;
  cities_: Array<any>;
  testAuth = false;
  authFailed = false;
  passwordconfirme: string = ''
  constructor(
    private router: Router,
     private utilsService: UtilsService,private serviceAuth:AuthServiceService) {

  }
ngOnInit(){
  console.log('section',this.section==='1');
  this.getAllFilieres()
}
  register() {
    console.log(this.role);

    var body={}
    if (this.role === 'candidat') {

      this.user.candidatFiliere=  this.filiere

    } else if (this.role === 'stagiaire') {
      this.user.stagiaireFilier=this.filiere

    }
    console.log("------user-------");
    console.log(this.user);
    this.serviceAuth.register( this.role,this.user).subscribe(
      (data: any) => {
        this.utilsService.showToast('success',
        'Inscription faite',
        `L\'inscription d'un nouveau utilisateur à étè faite avec success`);
        this.router.navigateByUrl("/auth/login");

      },
      (error) => {
        console.log(error);
        this.utilsService.showToast('danger',
        'Erreur interne',
        `L\'inscription n'a pas été faite`);
      }
    )
  }
  hasError($event) {
    this.CheckTelHasError = $event;

  }
  onCountryChange($event) {
    this.user.userPhoneNumber = null;

    this.CheckTelHasError = true;
  }
  next(event) {

    // this.section.next( event.target.id)
    this.section= event.target.id
  }
  getNumber($event) {
    this.phone = $event;
  }
  checkMail() {
    this.checkEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.user.userEmail);
  }
  changeCountry(count) {
    this.cities = this.worldMapData.getAllStatesFromCountry(count);

  }
  changeCountry_(count) {
    this.cities_ = this.worldMapData.getAllStatesFromCountry(count);

  }
  changeRole(event) {
    // this.section.next( event.target.id)
    this.section= event.target.id
    this.role = event.target.value

  }
  checkSection1Valid(): boolean {
    return this.user.userFirstName === '' || this.user.userLastName === '' ||
      this.user.userGender == '' || this.user.userCivilStatus === '' ||
      this.user.userBirthDate == '' || this.user.userBirthCity == null || this.user.userBirthCountry === '';
  }
  checkSection2Valid(): boolean {

    return this.user.userPhoneNumber == null  || this.user.userPays === undefined ||
       this.user.userAddress === undefined

  }
  checkSection3Valid(): boolean {
    return this.user.userEmail === '' || this.user.userLogin === '' ||
      this.passwordconfirme === '' || this.user.userPassword === '' || this.user.userPassword !== this.passwordconfirme;
  }
  checkCondidatValid(): boolean {
    return this.user.candidatDiplome === '' || this.user.candidatAnneeDiplome === '' ||
      this.user.candidatNumberExperience == null;
  }
  checkStagiaireValid(): boolean {

    return this.user.stagiaireEcole === '' || this.user.stagiaireFuturDiplome === '' ||
       this.user.stagiaireNiveauEtude ==='';
  }
  getAllFilieres(){
    this.utilsService.get(UtilsService.API_DOMAIN).subscribe(arg => this.sections = arg);

  }
}

