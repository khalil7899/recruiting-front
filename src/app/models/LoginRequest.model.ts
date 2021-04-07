export class LoginRequest {
  userLogin: string;
  userPassword: string;

  constructor(userLogin: string, userPassword: string) {
    this.userLogin = userLogin;
    this.userPassword = userPassword; }
}
