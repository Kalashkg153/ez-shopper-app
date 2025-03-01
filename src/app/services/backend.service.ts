import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http : HttpClient, private utility : UtilityService ) { }


  loginUser(loginreq : any){
    return this.http.post<any>("http://localhost:8080/auth/login", loginreq).pipe(
      catchError(this.handleError)
    )
  }

  registerUser(registerData : any){
    return this.http.post<string>("http://localhost:8080/auth/register", registerData, { responseType : 'text' as 'json' }).pipe(
      catchError(this.handleError)
    )
  }

  updateProfile(profileData : any, userId : any){
    return this.http.post("http://localhost:8080/auth/update-profile/" + userId, profileData, { responseType : 'text' as 'json' }).pipe(
      // catchError(this.handleError)
    )
  }

  updateUserProfilePassword(updatePasswordData : any, userId : any){
    return this.http.post("http://localhost:8080/auth/update-password/" + userId, updatePasswordData, { responseType : 'text' as 'json' }).pipe(
      // catchError(this.handleError)
    )
  }

  getCategories() : Observable<any> {
    return this.http.get<any[]>("http://localhost:8080/activeCategories").pipe(
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
    return this.http.get("http://localhost:8080/admin/deleteCategory/" + id, {headers, responseType: 'text' as 'json'}).pipe(
      catchError(this.handleError)
    )
  }

  getUserDetails(userName : any){
    return this.http.get("http://localhost:8080/user/" + userName).pipe(
      map((user : any) => {
        if(user.cart?.items){
          user.cart.items.map((item : any) => {
            if(item.productImage){
              let imageType = this.utility.getImageType(item.productImage);
              item.productImage = this.utility.convertBase64ToBlobUrl(item.productImage, imageType);
            }
            return item;
          })
        }

        return user;
      }),
      catchError(this.handleError)
    )
  }

  addNewCategory(categoryData : any){
    let token = sessionStorage.getItem("token");
    let headers = new HttpHeaders({
      'Authorization' : "Bearer " + token   
    })
    return this.http.post<string>("http://localhost:8080/admin/saveCategory", categoryData, {headers, responseType: 'text' as 'json'}).pipe(
      // catchError(this.handleError)
    )
  }


  resetPassword(username: any){
    return this.http.post("http://localhost:8080/reset-password", username ,{responseType: 'text' as 'json'}).pipe(
      catchError(this.handleError)
    )
  }


  sendPasswordLink(username: any){

    let params = new HttpParams().set("email", username);

    return this.http.post("http://localhost:8080/forgetPasswordLink", params ,{responseType: 'text' as 'json'}).pipe(
      catchError(this.handleError)
    )
  }


  addItemToCart(cartReq : any){
    return this.http.post("http://localhost:8080/cart/addToCart", cartReq).pipe(
      catchError(this.handleError)
    )
  }

  decreaseQuantityFromCart(cartReq : any){
    return this.http.post("http://localhost:8080/cart/decreaseQuantityFromCart", cartReq).pipe(
      catchError(this.handleError)
    )
  }

  removeItemFromCart(cartReq : any){
    return this.http.post("http://localhost:8080/cart/removeItemFromCart", cartReq).pipe(
      catchError(this.handleError)
    )
  }

  placeOrder(orderRequest : any){
    return this.http.post("http://localhost:8080/placeOrder", orderRequest, { responseType : 'text' as 'json' }).pipe(
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
