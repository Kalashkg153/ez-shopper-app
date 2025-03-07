import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { UtilityService } from './utility.service';
import { environment as env } from '../../environments/environment';
import { SuccessResponse } from '../models/successResponse';
import { ProductResponse } from '../models/productResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private utility : UtilityService, private http : HttpClient) { }

  
    addNewProduct(productData : any){
      let token = sessionStorage.getItem("token");
      let headers = new HttpHeaders({
        'Authorization' : "Bearer " + token   
      })
      return this.http.post<SuccessResponse>( env.productUrls.addNewProduct , productData);
    }
  
    getTrendingProducts() : Observable<any> {
      return this.http.get<ProductResponse[]>(env.productUrls.trendingProducts).pipe(
        map(products => {
          if(products != null){
            return products.map(product => {
              if (product.imageData) {
                let imageType = this.utility.getImageType(product.imageData);
                product.imageData = this.utility.convertBase64ToBlobUrl(product.imageData, imageType);
              }
              return product;
            });
          }
          
          return null;
        })
      )
    }
  
    getLatestProducts() : Observable<any> {
      return this.http.get<any[]>(env.productUrls.latestProducts).pipe(
        map(products => {
          if(products != null){
            return products.map(product => {
              if (product.imageData) {
                let imageType = this.utility.getImageType(product.imageData);
                product.imageData = this.utility.convertBase64ToBlobUrl(product.imageData, imageType);
              }
              return product;
            });
          }
          
          return null;
        })
      )
    }
  
    getAllProducts() : Observable<any> {
      return this.http.get<any[]>(env.productUrls.allProducts).pipe(
        map(products => {
          if(products != null){
            return products.map(product => {
              if (product.imageData) {
                let imageType = this.utility.getImageType(product.imageData);
                product.imageData = this.utility.convertBase64ToBlobUrl(product.imageData, imageType);
              }
              return product;
            });
          }
          
          return null;
        })
      )
    }
  
    getProductByCategory(category : string){
  
      return this.http.get<ProductResponse[]>(env.productUrls.productByCategory + category).pipe(
        map(products => {
          return products.map(product => {
            if (product.imageData) {
              let imageType = this.utility.getImageType(product.imageData);
              product.imageData = this.utility.convertBase64ToBlobUrl(product.imageData, imageType);
            }
            return product;
          });
        })
      )
    }
  
    getProductById(productId : string){
  
      return this.http.get<any>(env.productUrls.productById + productId).pipe(
        map(product => {
          if(product.imageData){
            let imageType = this.utility.getImageType(product.imageData);
            product.imageData = this.utility.convertBase64ToBlobUrl(product.imageData, imageType);
          }
          return product;
        })
      )
    }
  
    getProductImage(productId : string){
      return this.http.get<any>(env.productUrls.productImage + productId, { responseType : 'text' as 'json' })
    }
  
}
