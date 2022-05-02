import { Injectable } from '@angular/core';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IProduct } from '../models/product';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private getResponse: any;
  private myDataUri = 'https://wxuoey21rb.execute-api.eu-west-1.amazonaws.com/dev/products/';
  selectedProduct!: IProduct;
  

  constructor(private auth: AuthService, private http: HttpClient, private router: Router) { }

 
  getProducts(session:any):Observable<any> {
    var authenticatedUser = this.auth.getAuthenticatedUser();
    //console.log("authenticatedUser");
    //console.log(authenticatedUser == null);
    if (authenticatedUser != null) {
      console.log("We have a user");      
        const token = session.getIdToken().getJwtToken();    
        console.log("Sending request");
        console.log(token);
        let httpOptions = {
          
          headers: new HttpHeaders({
            'Authorization':  token
          }),
          }    
        return this.http.get<Response>(this.myDataUri, httpOptions).pipe(
          catchError(this.handleError)
        )
  }
  else
    console.log("No authenticated user");
  return EMPTY;
  
}

uploadProduct(session: any, prod:any){
  var authenticatedUser = this.auth.getAuthenticatedUser();

    if (authenticatedUser != null) {
      console.log("We have a user");      
        const token = session.getIdToken().getJwtToken();    
        console.log("Sending request");
        console.log(token);
        let httpOptions = {
          
          headers: new HttpHeaders({
            'Authorization':  token
          }),
          }    
  this.http.post(this.myDataUri,prod, httpOptions).subscribe(response =>
    console.log(response))
}
}


  
  handleError(handleError: any): any {
    if (handleError.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', handleError.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${handleError.status}, ` +
        `body was: ${handleError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened. please try again later.');
  }

}


