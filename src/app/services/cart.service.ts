import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendService } from './backend.service';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    private cartItemSubject = new BehaviorSubject<number>(0);
    private cartSubject = new BehaviorSubject<any>({});
    cart$ = this.cartSubject.asObservable();
    cartItem$ = this.cartItemSubject.asObservable(); 
  
    constructor(private userApiService : UserApiService) { }
  
  
    updateCartItem(num : any){
      // let num = this.cartItemSubject.getValue();
      this.cartItemSubject.next(num);
    }
  
    updateCart(userName : any){
      if(userName === "" || userName === null){
        this.cartSubject.next({});
        this.updateCartItem(0);
      }
      this.userApiService.getUserDetails(userName).subscribe({
        next : (res : any) => {
          console.log(res);
          console.log(res.cart);
          this.cartSubject.next(res.cart);
          this.updateCartItem(res.cart?.items?.length);
        },
        error : (err) => {
          console.log(err);
        }
      })
    }
}
