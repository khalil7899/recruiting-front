import {LoginRequest} from '../../models/LoginRequest.model';
import {Component} from "@angular/core";
import {Router} from "@angular/router";
import { JwtResponse } from '../../models/JwtResponse.model';
import { AuthServiceService } from '../../services/auth/auth-service.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class NgxLoginComponent {
 
  loginRequest:LoginRequest=new LoginRequest('','');

  testAuth=false;
  authFailed=false;
  constructor(
    private router: Router,private serviceAuth:AuthServiceService) {

  }

  login()
  {
   
    this.loginRequest=new LoginRequest(this.loginRequest.userLogin,this.loginRequest.userPassword);
    this.serviceAuth.login(this.loginRequest).subscribe(
      (data:JwtResponse)=>{
       
        localStorage.setItem('token',data.token);
        localStorage.setItem('userFirstName',data.userFirstName);
        localStorage.setItem('userLastName',data.userLastName);
        localStorage.setItem('userRole',data.userRole);
        localStorage.setItem("roles", JSON.stringify(data.roles));
        if(data.userPictureUrl != null && data.userPictureUrl != ""){
        localStorage.setItem("picture",data.userPictureUrl)
        }
        this.router.navigateByUrl("/recruiting");
        this.testAuth=false;
      },
      (error)=>{
        console.log(error);
        this.testAuth=true;
      }
    )
  }
  checkValid(){
    return this.loginRequest.userLogin==='' || this.loginRequest.userPassword===''
  }
}
