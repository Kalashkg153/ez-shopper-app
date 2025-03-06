import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { BackendService } from '../services/backend.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../models/product';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { UtilityService } from '../services/utility.service';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductApiService } from '../services/product-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, FormsModule, ProductCardComponent, RouterModule, CategoryBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  images = [
    "images/banner1.jpg",
    "images/banner2.jpg",
    "images/banner3.jpg",
    "images/banner4.jpg",
    "images/banner5.jpg",
    "images/banner6.jpg"
  ];

  paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

  
  userName : any;
  trendingProducts : Product[] = [];
  latestProducts : Product[] = [];
  date: Date | undefined;

  constructor(private backend : BackendService, private productApi : ProductApiService, private utility : UtilityService,
    private cartService : CartService, private auth : AuthService){
  }

  ngOnInit() : void{
    this.auth.user$.subscribe((user) => {
      this.userName = user?.username;
    })

    if(this.userName !== undefined)
        this.cartService.updateCart(this.userName);
    this.getTrendingProducts();
    this.getLatestProducts();
  }


  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}

  getTrendingProducts(){
    this.utility.loaderSubject.next(true);
    this.productApi.getTrendingProducts().subscribe({
      next : (res : any[]) => {
        this.utility.loaderSubject.next(false);
        console.log(res);
        res.map(product => {
          let trendingProduct = new Product(product);
          this.trendingProducts.push(trendingProduct);
        })
      },
      error : (err) => {
        console.log(err);
        this.utility.loaderSubject.next(false);
      }
    });
  }

  // getUserDetails(){
  //   this.backend.getUserDetails(this.userName).subscribe({
  //     next : (res : any) => {
  //       console.log(res.cart);
  //       this.utility.updateCart(res.cart);
  //       this.utility.updateCartItem(res.cart.items.length);
  //     },
  //     error : (err) => {
  //       console.log(err);
  //     }
  //   })
  // }

  getLatestProducts(){
    this.utility.loaderSubject.next(true);
    this.productApi.getLatestProducts().subscribe({
      next : (res : any[]) => {
        res.map(product => {
          let newProduct = new Product(product);
          this.latestProducts.push(newProduct);
        })
      },
      error : (err) => {
        console.log(err);
      }
    });
  }

  
}
