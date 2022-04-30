import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { NavComponent } from 'src/app/nav/nav.component';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoading: boolean = false;
  email_address: string = "";
  password: string = "";

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    var authenticatedUser = this.auth.getAuthenticatedUser();
   }

  onSignIn(form: NgForm){
    if (form.valid) {
      this.isLoading = true;
      let authenticationDetails = new AuthenticationDetails({
          Username: this.email_address,
          Password: this.password,
      });
      let poolData = {
        UserPoolId: environment.cognitoUserPoolId, 
        ClientId: environment.cognitoAppClientId 
      };

      let userPool = new CognitoUserPool(poolData);
      let userData = { Username: this.email_address, Pool: userPool };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          this.auth.signedIn = true;
          this.router.navigateByUrl("/products")
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
          this.isLoading = false;
        },
      });
    }
  }
}