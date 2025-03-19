import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { UtilityService } from './utility.service';
import { environment as env } from '../../environments/environment';
import { SuccessResponse } from '../models/successResponse';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http : HttpClient, private utility : UtilityService ) { }


  getCategories() : Observable<any> {
    let token = sessionStorage.getItem("token");
    let headers = new HttpHeaders({
      'Authorization' : "Bearer " + token   
    })

    return this.http.get<any[]>(env.categoryUrls.categories, {headers}).pipe(
      map(categories => {
        console.log(categories);
        if(categories != null){
          return categories.map(category => {
            if (category.categoryImageData) {
              let imageType = this.utility.getImageType(category.categoryImageData);
              category.categoryImageData = this.utility.convertBase64ToBlobUrl(category.categoryImageData, imageType);
            }
            return category;
          });
        }

        return null;
      })
    )
  }

  getActiveCategories() : Observable<any> {
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
    return this.http.get<SuccessResponse>(env.categoryUrls.deleteCategory + id, {headers})
  }

  

  addNewCategory(categoryData : any){
    let token = sessionStorage.getItem("token");
    let headers = new HttpHeaders({
      'Authorization' : "Bearer " + token   
    })
    return this.http.post<SuccessResponse>(env.categoryUrls.addCategory, categoryData, {headers})
  }


  placeOrder(orderRequest : any){
    return this.http.post<SuccessResponse>(env.orderUrls.placeOrder , orderRequest)
  }

  getOrders(username : any){
    return this.http.get(env.orderUrls.getOrders + username)
  }

  cancelOrder(orderId : any){
    return this.http.delete<SuccessResponse>(env.orderUrls.deleteOrder + orderId)
  }

  getAllOrder(){
    let token = sessionStorage.getItem("token");
    let headers = new HttpHeaders({
      'Authorization' : "Bearer " + token   
    })
    return this.http.get(env.orderUrls.getAllOrders, {headers});
  }

  updateOrderStatus(orderId : any, orderStatus : any){
    let token = sessionStorage.getItem("token");
    let headers = new HttpHeaders({
      'Authorization' : "Bearer " + token   
    })
    let params = new HttpParams().set("OrderStatus", orderStatus);
    this.http.post(env.orderUrls.updateOrderStatus + orderId, params, {headers});
  }


}
