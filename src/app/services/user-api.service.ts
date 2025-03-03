import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UtilityService } from "./utility.service";
import { catchError, map, throwError } from "rxjs";
import { environment as env } from "../../environments/environment";




@Injectable({
  providedIn: 'root'
})
export class UserApiService {

    constructor(private utility : UtilityService, private http : HttpClient) { }


    loginUser(loginreq : any){
        return this.http.post<any>(env.userUrls.login , loginreq).pipe(
          catchError(this.handleError)
        )
      }
    
    registerUser(registerData : any){
      return this.http.post<string>(env.userUrls.register , registerData, { responseType : 'text' as 'json' }).pipe(
        catchError(this.handleError)
      )
    }
  
    updateProfile(profileData : any, userId : any){
      return this.http.post(env.userUrls.updateProfile + userId, profileData, { responseType : 'text' as 'json' }).pipe(
        // catchError(this.handleError)
      )
    }
  
    updateUserProfilePassword(updatePasswordData : any, userId : any){
      return this.http.post(env.userUrls.updatePassword + userId, updatePasswordData, { responseType : 'text' as 'json' }).pipe(
        // catchError(this.handleError)
      )
    }

    getUserDetails(userName : any){
        return this.http.get(env.userUrls.userDetails + userName).pipe(
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


      resetPassword(username: any){
        return this.http.post(env.userUrls.resetPassword, username ,{responseType: 'text' as 'json'}).pipe(
          catchError(this.handleError)
        )
      }
    
    
      sendPasswordLink(username: any){
    
        let params = new HttpParams().set("email", username);
    
        return this.http.post(env.userUrls.sendPasswordResetLink, params ,{responseType: 'text' as 'json'}).pipe(
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