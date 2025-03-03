import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';
import { ToastService } from '../services/toast.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { CartApiService } from '../services/cart-api.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  userCartItems : any[] = [];
  cartTotalPrice : number = 0;
  username : any;
  cartItem = {
    userName : "",
    productId : "",
    productName : "",
    quantity : 1,
    price : 0.0
  }
  constructor(private cartService : CartService, private message : ToastService, private cartApiService : CartApiService,
    private backend : BackendService, private auth : AuthService, private router : Router){

  }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.username = user?.username;
    })
    this.cartService.cart$.subscribe((cart) => {
      this.userCartItems = cart.items;
      this.cartTotalPrice = cart.totalPrice;
    })

    this.cartItem.userName = this.username;
  }


  decreaseQuantityFromCart(productId : any){
    this.cartItem.productId = productId;
    this.cartApiService.decreaseQuantityFromCart(this.cartItem).subscribe({
      next : (res) => {
        console.log(res);
        if(res){
          this.cartService.updateCart(this.username);
        }
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  removeItemFromCart(productId : any){
    this.cartItem.productId = productId;
    this.cartApiService.removeItemFromCart(this.cartItem).subscribe({
      next : (res) => {
        console.log(res);
        if(res){
          this.cartService.updateCart(this.username);
        }
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  addItemToCart(productId : any){
    this.cartItem.productId = productId;
    this.cartApiService.addItemToCart(this.cartItem).subscribe({
      next : (res) => {
        console.log(res);
        if(res){
          this.cartService.updateCart(this.username);
        }
      },
      error : (err) => {
        console.log(err);
      }
    })
  }


  ProceedToBuy(){
    this.router.navigateByUrl("checkout-cart");
  }

}
