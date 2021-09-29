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
  public static REMOTE_ADDRESS = "http://localhost:8090";

  public static API_AUTH = UtilsService.REMOTE_ADDRESS + "/api/auth/signin";
  public static API_USER = UtilsService.REMOTE_ADDRESS+ "/api/user";
  public static API_RH = UtilsService.REMOTE_ADDRESS + "/api/rh";
  public static API_USER_FILE = UtilsService.REMOTE_ADDRESS + "/api/file";
  public static API_DOMAIN = UtilsService.REMOTE_ADDRESS+ "/api/domaine";
  public static API_CANDIDATE = UtilsService.REMOTE_ADDRESS+ "/api/candidat";
  public static API_TRAINEER = UtilsService.REMOTE_ADDRESS+ "/api/stagiaire";
  public static API_JOB = UtilsService.REMOTE_ADDRESS+ "/api/offre-job";
  public static API_CAND_STAGE = UtilsService.REMOTE_ADDRESS+ "/api/candstage";
  public static API_CAND_JOB = UtilsService.REMOTE_ADDRESS+ "/api/candjob";
  public static API_STATISTIC = UtilsService.REMOTE_ADDRESS+ "/api/statistic";
  public static API_MESSAGERIE = UtilsService.REMOTE_ADDRESS+ "/api/message";

  constructor(
    private toastrService: NbToastrService,
    private httpClient: HttpClient,
    private datePipe: DatePipe
  ) {

  }
  
  getDomains() {
    return this.httpClient.get(UtilsService.API_DOMAIN);
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
}
