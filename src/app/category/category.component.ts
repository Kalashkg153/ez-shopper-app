import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { BackendService } from '../services/backend.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductApiService } from '../services/product-api.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(private router : Router,private productApi : ProductApiService, private route : ActivatedRoute, private backend : BackendService){}

  categoryProducts : Product[] = [];
  categoryName : string = "";

  ngOnInit() : void {
    console.log(this.router.url);
    let categoryName = this.route.snapshot.params['name'];
    this.categoryName = categoryName;
    this.getProducts(categoryName);

  }



  getProducts(category : string){
    this.productApi.getProductByCategory(category).subscribe({
      next : (res) => {
        console.log(res);
        res.map(product => {
          let catProduct = new Product(product);
          this.categoryProducts.push(catProduct);
        })
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

}
