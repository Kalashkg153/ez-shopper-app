import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { Product } from '../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductApiService } from '../services/product-api.service';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent {

  searchedproducts : Product[] = [];

  constructor(private route: ActivatedRoute,private productApi : ProductApiService , private backend : BackendService) {}

  ngOnInit() {
    const searchText = this.route.snapshot.queryParamMap.get('search');
    console.log(searchText);


    if(searchText){
      this.productApi.getAllProducts().subscribe({
        next : (res : any[]) => {

          console.log(res);
          
          let filteredProducts = res.filter((product) => {
            return product.title.includes(searchText)
          })


          console.log(filteredProducts);

          filteredProducts.map(product => {
            let trendingProduct = new Product(product);
           this.searchedproducts.push(trendingProduct);
          })
        }, 
        error : (err) => {
          console.log(err);
        }
      })
    }
  }
}
