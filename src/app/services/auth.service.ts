import { Injectable } from '@angular/core';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment.prod';

const poolData = {
    UserPoolId: environment.cognitoUserPoolId,
    ClientId: environment.cognitoAppClientId
  };
  const userPool = new CognitoUserPool(poolData);
@Injectable({
  providedIn: 'root'
}) 

export class AuthService {
 signedIn = false;

  constructor() { }

  isLoggedIn(): boolean {
    var isAuth = false;

    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };

    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        }
        isAuth = session.isValid();
      })
    }
    return isAuth;
  }

  signOut():void {
    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };

    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.signOut();
  }
}

getToken():any{
  var authenticatedUser = this.getAuthenticatedUser();
if (authenticatedUser != null) {

authenticatedUser.getSession( (err:any, session:any) => {
  if (err) {
    console.log(err);
    return;
  }
  const token = session.getIdToken().getJwtToken();      
return token;
  
});
}
}

getAuthenticatedUser() {
  
  console.log( "userPool.getCurrentUser()");
  console.table( userPool.getCurrentUser());
  return userPool.getCurrentUser();
}
}



