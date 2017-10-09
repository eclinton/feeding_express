import {Injectable} from '@angular/core';
import { User } from "../models/user/user";
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthenticationService {
  private domain:string = '';
  private username:string ='';

  constructor(private afAuth: AngularFireAuth )
  {

  }


  getDomain():string {
    return this.domain;
  }

  getUsername():string{
    return this.username
  }

  setDomain(credentials:string) {
    this.domain = credentials;
  }
  setUsername(credentials:string)
  {
    this.username = credentials
  }

  getAuth(): AngularFireAuth{
      return this.afAuth;
  }

  signOut(): void{
      this.afAuth.auth.signOut();
  }
}
