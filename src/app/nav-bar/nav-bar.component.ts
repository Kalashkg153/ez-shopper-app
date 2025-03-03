import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, FormsModule, NgbDropdownModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  user: User | null = null;
  cartItemsNumber = 0;
  faCircleUser = faCircleUser;
  faCartPlus = faCartPlus;
  searchText : string = "";

  constructor(private router : Router, private cartService : CartService, private message : ToastService,  private authService : AuthService){

  }

  ngOnInit() : void{
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.cartService.cartItem$.subscribe((value) => {
      this.cartItemsNumber = value;
    })
  }

  searchProducts(){
    if(this.searchText !== ""){
      this.router.navigate(['searched-product'],{
        queryParams: { search: this.searchText}
      });
    }
  }


  logout(){
    this.authService.logout();
    this.cartService.updateCart("");
    this.message.SucessMessage("You have logged out Successfully");
    this.router.navigateByUrl("");
  }

  viewProfile(){
    this.router.navigate(["profile", this.user?.username]);
  }

  viewOrders(){
    this.router.navigate(["my-orders", this.user?.username]);
  }

}
