import {Injectable} from '@angular/core';
import { User } from "../models/user";
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthenticationService {
  private domain:string = '';

  constructor(private afAuth: AngularFireAuth )
  {

  }
  

  getDomain():string {
    return this.domain;
  }

  setDomain(credentials:string) {
    this.domain = credentials;
  }

  getAuth(): AngularFireAuth{
      return this.afAuth;
  }

  signOut(): void{
      this.afAuth.auth.signOut();
  }
}