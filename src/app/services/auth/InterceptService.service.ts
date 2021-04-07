import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
// RxJS
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.indexOf("assets") == -1) {
      
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }

   
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            
          }
        },
        (error) => {
          // http response status code
          
          console.error(error.status);
          console.error(error.message);
         
        }
      )
    );
  }

}
