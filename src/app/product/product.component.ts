import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faArrowLeft, faMoneyBillWave, faArrowRotateLeft, faTruckFast, faShieldHalved, faTruckMoving, faAward  } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../models/product';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { CartService } from '../services/cart.service';
import { ProductApiService } from '../services/product-api.service';
import { ButtonSpinnerComponent } from '../button-spinner/button-spinner.component';
import { CartApiService } from '../services/cart-api.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, ButtonSpinnerComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  faArrowLeft = faArrowLeft;
  faMoneyBillWave = faMoneyBillWave;
  faArrowRotateLeft = faArrowRotateLeft;
  faTruckFast = faTruckFast;
  faShieldHalved = faShieldHalved;
  faTruckMoving = faTruckMoving;
  faAward = faAward;
  faStar = faStar;
  isLoading : boolean = false;
  productId : string = "";
  product !: Product;
  cartItem = {
      userName : "",
      productId : "",
      productImage : "",
      productName : "",
      quantity : 1,
      price : 0.0
  }

  constructor(private backend : BackendService, private productApi : ProductApiService, private authService : AuthService, private message : ToastService,
    private router : Router, private cartService : CartService, private cartApiService : CartApiService, private route : ActivatedRoute){}
  
  ngOnInit() : void {
    let productId = this.route.snapshot.params['id'];
    this.productId = productId;
    this.productApi.getProductById(this.productId).subscribe({
      next : (res) => {
        console.log(res);
        this.product = new Product(res);
        console.log(this.product);
      },
      error : (err) => {
        console.log(err);
      }
    })

    this.authService.user$.subscribe((user) => {
      this.cartItem.userName = user?.username ?? "";
    });
    this.productApi.getProductImage(this.productId).subscribe((res) => {
      console.log(res);
      this.cartItem.productImage = res;
    });
  }

  addToCart(){
    if(this.cartItem.userName === "" || this.cartItem.userName === null){
      this.router.navigateByUrl("login");
      return;
    }

    this.isLoading = true;

    this.cartItem.productId = this.productId;
    this.cartItem.productName = this.product.productTitle;
    this.cartItem.price = this.product.productDiscountedPrice;

    this.cartApiService.addItemToCart(this.cartItem).subscribe({
      next : (res) => {
        this.isLoading = false;
        if(res){
          this.message.SucessMessage("Great choice! Your item has been added to the Cart");
          this.cartService.updateCart(this.cartItem.userName);
        }
        else{
          this.message.ErrorMessage("Something went wrong! Couldn't add the item to your Cart")
        }
      },  
      error : (err) => {
        this.isLoading = false;
        console.log(err);
      }
    })

  }
}
