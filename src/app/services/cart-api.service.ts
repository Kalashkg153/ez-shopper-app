import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  constructor(private http : HttpClient) { }

  
    addItemToCart(cartReq : any){
      return this.http.post(env.cartUrls.addItemsToCart, cartReq).pipe(
        catchError(this.handleError)
      )
    }
  
    decreaseQuantityFromCart(cartReq : any){
      return this.http.post(env.cartUrls.decreaseQuantityFromCart, cartReq).pipe(
        catchError(this.handleError)
      )
    }
  
    removeItemFromCart(cartReq : any){
      return this.http.post(env.cartUrls.removeItemFromCart, cartReq).pipe(
        catchError(this.handleError)
      )
    }


    private handleError(error: HttpErrorResponse) {
        let errorMessage = error.message;
    
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Client Error: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMessage = 'Bad request!';
              break;
            case 401:
              errorMessage = 'Unauthorized! Please login.';
              break;
            case 403:
              errorMessage = 'Forbidden! You do not have access to these Services';
              break;
            case 404:
              errorMessage = 'The Page or Service you want Does not Exist!';
              break;
            case 500:
              errorMessage = 'Internal server error!';
              break;
          }
        }
    
        console.error(`API Error: ${errorMessage}`);
        return throwError(() => new Error(errorMessage)); // Throw a user-friendly error
      }
}
