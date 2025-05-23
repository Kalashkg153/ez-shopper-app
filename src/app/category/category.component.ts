import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { BackendService } from '../services/backend.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductApiService } from '../services/product-api.service';
import { UtilityService } from '../services/utility.service';
import { ToastService } from '../services/toast.service';
import { ProductResponse } from '../models/productResponse';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(private router : Router,private productApi : ProductApiService, private utility : UtilityService,
    private route : ActivatedRoute, private message : ToastService){}

  categoryProducts : Product[] = [];
  categoryName : string = "";

  ngOnInit() : void {
    console.log(this.router.url);
    let categoryName = this.route.snapshot.params['name'];
    this.categoryName = categoryName;
    this.getProducts(categoryName);

  }



  getProducts(category : string){
    this.utility.loaderSubject.next(true);
    this.productApi.getProductByCategory(category).subscribe({
      next : (res : ProductResponse[]) => {
        this.utility.loaderSubject.next(false);
        
        res.map(product => {
          let catProduct = new Product(product);
          this.categoryProducts.push(catProduct);
        })
      },
      error : (err) => {
        this.utility.loaderSubject.next(false);
        this.message.ErrorMessage(err.error);
      }
    })
  }

}
