import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { SuccessResponse } from '../models/successResponse';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  constructor(private http : HttpClient) { }

  
    addItemToCart(cartReq : any){
      return this.http.post<SuccessResponse>(env.cartUrls.addItemsToCart, cartReq)
    }
  
    decreaseQuantityFromCart(cartReq : any){
      return this.http.post(env.cartUrls.decreaseQuantityFromCart, cartReq)
    }
  
    removeItemFromCart(cartReq : any){
      return this.http.post(env.cartUrls.removeItemFromCart, cartReq)
    }
}
