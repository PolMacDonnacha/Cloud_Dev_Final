import { Component, OnInit } from '@angular/core';
import { CognitoUserPool,CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface formDataInterface {
  "given_name": string;
  "family_name": string;
  "email": string;
  [key: string]: string;
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isLoading:boolean = false;
  given_name:string = '';
  family_name:string = '';
  email:string = '';
  password:string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {}

  onSignup(form: NgForm){
    if (form.valid) {
     this.isLoading = true;
     var poolData = {
       UserPoolId: environment.cognitoUserPoolId, 
       ClientId: environment.cognitoAppClientId 
     };
     var userPool = new CognitoUserPool(poolData);
     var attributeList = [];
     let formData:formDataInterface = {
       "given_name": this.given_name,
       "family_name": this.family_name,
       "email": this.email,
     }

     for (let key  in formData) {
       let attrData = {
         Name: key,
         Value: formData[key]
       }
       let attribute = new CognitoUserAttribute(attrData);
       attributeList.push(attribute)
     }
     userPool.signUp(this.email, this.password, attributeList, [], (
       err,
       result
     ) => {
       this.isLoading = false;
       if (err) {
         alert(err.message || JSON.stringify(err));
         return;
       }
       this.router.navigate(['login']);
     });
    }
 }


}