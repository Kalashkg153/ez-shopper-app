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
        return this.http.post<any>(env.userUrls.login , loginreq)
    }
    
    registerUser(registerData : any){
      return this.http.post<string>(env.userUrls.register , registerData, { responseType : 'text' as 'json' })
    }
  
    updateProfile(profileData : any, userId : any){
      return this.http.post(env.userUrls.updateProfile + userId, profileData, { responseType : 'text' as 'json' })
    }
  
    updateUserProfilePassword(updatePasswordData : any, userId : any){
      return this.http.post(env.userUrls.updatePassword + userId, updatePasswordData, { responseType : 'text' as 'json' })
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
          })
        )
      }


      resetPassword(username: any){
        return this.http.post(env.userUrls.resetPassword, username ,{responseType: 'text' as 'json'});
      }
    
    
      sendPasswordLink(username: any){
    
        let params = new HttpParams().set("email", username);
    
        return this.http.post(env.userUrls.sendPasswordResetLink, params ,{responseType: 'text' as 'json'});
      }


    
}