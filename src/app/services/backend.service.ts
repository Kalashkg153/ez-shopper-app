import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { UtilityService } from './utility.service';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http : HttpClient, private utility : UtilityService ) { }


  getCategories() : Observable<any> {
    return this.http.get<any[]>(env.categoryUrls.activeCategories).pipe(
      map(categories => {
        return categories.map(category => {
          if (category.categoryImageData) {
            let imageType = this.utility.getImageType(category.categoryImageData);
            category.categoryImageData = this.utility.convertBase64ToBlobUrl(category.categoryImageData, imageType);
          }
          return category;
        });
      }),
      catchError(this.handleError)
    )
  }


  deleteCategory(id : string){
    let token = sessionStorage.getItem("token");
    let headers = new HttpHeaders({
      'Authorization' : "Bearer " + token   
    })
    return this.http.get(env.categoryUrls.deleteCategory + id, {headers, responseType: 'text' as 'json'}).pipe(
      catchError(this.handleError)
    )
  }

  

  addNewCategory(categoryData : any){
    let token = sessionStorage.getItem("token");
    let headers = new HttpHeaders({
      'Authorization' : "Bearer " + token   
    })
    return this.http.post<string>(env.categoryUrls.addCategory, categoryData, {headers, responseType: 'text' as 'json'}).pipe(
      // catchError(this.handleError)
    )
  }


  placeOrder(orderRequest : any){
    return this.http.post(env.orderUrls.placeOrder , orderRequest, { responseType : 'text' as 'json' }).pipe(
      catchError(this.handleError)
    )
  }

  getOrders(username : any){
    return this.http.get(env.orderUrls.getOrders + username).pipe(
      catchError(this.handleError)
    )
  }

  cancelOrder(orderId : any){
    return this.http.delete(env.orderUrls.deleteOrder + orderId, { responseType : 'text' as 'json' }).pipe(
      catchError(this.handleError)
    )
  }




  private handleError(error: HttpErrorResponse) {
    let errorMessage = error.message;

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
