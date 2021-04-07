import { Injectable } from "@angular/core";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from "@nebular/theme";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  // public static REMOTE_ADDRESS = 'http://212.129.62.79:8090/';
  public static REMOTE_ADDRESS = "http://localhost:8090/";
  public static REMOTE_ADMINISTRATION_URL = UtilsService.REMOTE_ADDRESS + 'bs-administration';

  public static REMOTE_ORGANISATION_URL = UtilsService.REMOTE_ADDRESS + 'bs-organisation-management/';
  public static API_AUTH = UtilsService.REMOTE_ADDRESS + "api/auth/signin";
  public static API_USER = UtilsService.REMOTE_ADMINISTRATION_URL+ "/api/user";
  public static API_SKILLS_GROUP = UtilsService.REMOTE_ADDRESS +"api/skills-group"
  public static API_USER_FILE = UtilsService.REMOTE_ADMINISTRATION_URL +"/api/file";
  public static API_USER_GROUP=UtilsService.REMOTE_ADMINISTRATION_URL +"/api/user-group";
  public static API_GROUP = UtilsService.REMOTE_ADMINISTRATION_URL +"/api/group";
  public static API_ACCESS_RIGHT=UtilsService.REMOTE_ADMINISTRATION_URL +"/api/access-right";
  public static API_GROUP_ACCESS_RIGHT=UtilsService.REMOTE_ADMINISTRATION_URL +"/api/group-access-right";
  public static API_EVALUATIONCRITERIA = UtilsService.REMOTE_ORGANISATION_URL +"/api/evaluationcriteria";
  public static API_POSITIONCATEGORY=UtilsService.REMOTE_ORGANISATION_URL+"/api/position-category";
  public static API_RATINGSCALE = UtilsService.REMOTE_ORGANISATION_URL +"/api/ratingScale";
  public static API_POSITION=UtilsService.REMOTE_ORGANISATION_URL+"api/position";
  public static API_MISSION=UtilsService.REMOTE_ORGANISATION_URL+"api/mission";

  public static API_BUSINESS_UNIT_SKILLS=UtilsService.REMOTE_ORGANISATION_URL+"/api/business_unit_Skills"


  public static API_ATTRIBUTION=UtilsService.REMOTE_ORGANISATION_URL+"api/attribution";
  public static API_ATTRIBUTION_MODIF_LABEL=UtilsService.REMOTE_ORGANISATION_URL+"api/attribution/modif_label";
 

  constructor(
    private toastrService: NbToastrService,
    private httpClient: HttpClient,
    private datePipe: DatePipe
  ) {

  }

  public showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `${title}` : '';
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

  public post(url: string, object: any): Observable<any> {

    return this.httpClient.post(url, object);
  }

  public put(url: string, object: any): Observable<any> {

    return this.httpClient.put(url, object);
  }

  public get(url: string): Observable<any> {

    return this.httpClient.get(url);
  }

  public delete(url: string): Observable<any> {

    return this.httpClient.delete(url);
  }


  now(format: string): string {

    return this.datePipe.transform(new Date().toLocaleDateString('en-US', { timeZone: 'Africa/Tunis' }) +
      ' ' + new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Tunis' }), format, 'Africa/Tunis');

  }

  getDate(date: any, format: string): string {
    return this.datePipe.transform(date, format, 'Africa/Tunis');
  }
  convertAmountToString(initialAmount: string) : string {

    let amount = '';
    if (initialAmount.includes('.')) {
      const array: any[] = initialAmount.split('.');
      if (array[1].length === 1) {
        array[1] = "." + array[1] + "00";
        return array[0] + array[1];
      } else if (array[1].length === 2) {
        array[1] = "." + array[1] + "0";
        return array[0] + array[1];
      }
      return array[0] + '.' + array[1];
    } else {
      amount = initialAmount + '.000';
      return amount;
    }

  }
}
