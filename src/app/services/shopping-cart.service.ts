import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IProduct } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  @Output() products : IProduct[] = [];
  private myDataUri = 'https://wxuoey21rb.execute-api.eu-west-1.amazonaws.com/dev/order/';

  constructor(private http:HttpClient,private auth: AuthService) { }


  addToCart(product:IProduct){
    if (this.products.includes(product)){
      product.Quantity += 1
    }
    else{
      product.Quantity = 1
      this.products.push(product);
    }
  }

  removeFromCart(product:IProduct){
    let updatedCart: IProduct[] = [];
    this.products.forEach(element => {
      console.log("element")
      console.log(element)
      if(element == product){
        console.log("This product is the same")
      }
      else if(element != product){
        console.log("This product is NOT the same")

          updatedCart.push(element);
      }
    });
    this.products = updatedCart;
    console.log(this.products.length)
  }

  getCartItems():IProduct[]{
    return this.products
  }
  
  checkout(products:IProduct[], session:any):Boolean{

    var authenticatedUser = this.auth.getAuthenticatedUser();
    var productJson = JSON.stringify(products)
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
        this.http.post<Response>(this.myDataUri,{productJson}, httpOptions).pipe(
          catchError(this.handleError)
        )
        this.products = [];
        return true;

      }
      return false;
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
