import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { UtilityService } from './utility.service';

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
      return this.http.post<string>("http://localhost:8080/admin/saveProduct", productData, {headers, responseType: 'text' as 'json'}).pipe(
        // catchError(this.handleError)
      )
    }
  
    getTrendingProducts() : Observable<any> {
      return this.http.get<any[]>("http://localhost:8080/trendingProducts").pipe(
        map(products => {
          return products.map(product => {
            if (product.imageData) {
              let imageType = this.utility.getImageType(product.imageData);
              product.imageData = this.utility.convertBase64ToBlobUrl(product.imageData, imageType);
            }
            return product;
          });
        }),
        catchError(this.handleError)
      )
    }
  
    getLatestProducts() : Observable<any> {
      return this.http.get<any[]>("http://localhost:8080/latestProducts").pipe(
        map(products => {
          return products.map(product => {
            if (product.imageData) {
              let imageType = this.utility.getImageType(product.imageData);
              product.imageData = this.utility.convertBase64ToBlobUrl(product.imageData, imageType);
            }
            return product;
          });
        }),
        catchError(this.handleError)
      )
    }
  
    getAllProducts() : Observable<any> {
      return this.http.get<any[]>("http://localhost:8080/getAllProducts").pipe(
        map(products => {
          return products.map(product => {
            if (product.imageData) {
              let imageType = this.utility.getImageType(product.imageData);
              product.imageData = this.utility.convertBase64ToBlobUrl(product.imageData, imageType);
            }
            return product;
          });
        }),
        catchError(this.handleError)
      )
    }
  
    getProductByCategory(category : string){
  
      return this.http.get<any[]>("http://localhost:8080/getProductsByCategory/" + category).pipe(
        map(products => {
          return products.map(product => {
            if (product.imageData) {
              let imageType = this.utility.getImageType(product.imageData);
              product.imageData = this.utility.convertBase64ToBlobUrl(product.imageData, imageType);
            }
            return product;
          });
        }),
        catchError(this.handleError)
      )
    }
  
    getProductById(productId : string){
  
      return this.http.get<any>("http://localhost:8080/getProductById/" + productId).pipe(
        map(product => {
          if(product.imageData){
            let imageType = this.utility.getImageType(product.imageData);
            product.imageData = this.utility.convertBase64ToBlobUrl(product.imageData, imageType);
          }
          return product;
        }),
        catchError(this.handleError)
      )
    }
  
    getProductImage(productId : string){
      return this.http.get<any>("http://localhost:8080/productImageData/" + productId, { responseType : 'text' as 'json' } ).pipe(
        catchError(this.handleError)
      )
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
    
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Client Error: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMessage = 'Bad request!';
              break;
            case 401:
              errorMessage = 'Unauthorized! Please login.';
              break;
            case 403:
              errorMessage = 'Forbidden! You do not have access to these Services';
              break;
            case 404:
              errorMessage = 'The Page or Service you want Does not Exist!';
              break;
            case 500:
              errorMessage = 'Internal server error!';
              break;
          }
        }
    
        console.error(`API Error: ${errorMessage}`);
        return throwError(() => new Error(errorMessage)); // Throw a user-friendly error
      }
  
}
