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
      })
    )
  }


  deleteCategory(id : string){
    let token = sessionStorage.getItem("token");
    let headers = new HttpHeaders({
      'Authorization' : "Bearer " + token   
    })
    return this.http.get(env.categoryUrls.deleteCategory + id, {headers, responseType: 'text' as 'json'})
  }

  

  addNewCategory(categoryData : any){
    let token = sessionStorage.getItem("token");
    let headers = new HttpHeaders({
      'Authorization' : "Bearer " + token   
    })
    return this.http.post<string>(env.categoryUrls.addCategory, categoryData, {headers, responseType: 'text' as 'json'})
  }


  placeOrder(orderRequest : any){
    return this.http.post(env.orderUrls.placeOrder , orderRequest, { responseType : 'text' as 'json' })
  }

  getOrders(username : any){
    return this.http.get(env.orderUrls.getOrders + username)
  }

  cancelOrder(orderId : any){
    return this.http.delete(env.orderUrls.deleteOrder + orderId, { responseType : 'text' as 'json' })
  }


}
