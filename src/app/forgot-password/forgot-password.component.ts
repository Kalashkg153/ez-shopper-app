import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';
import { ToastService } from '../services/toast.service';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  userNameForm !: FormGroup;
  responseMessage : string = "";
  
    constructor(private fb : FormBuilder, private backend : BackendService, private userApiService : UserApiService,
      private router : Router, private message: ToastService, private authService : AuthService){
      this.userNameForm = this.fb.group({
        username : ['', [Validators.required, Validators.email]]
      })
    }


    passwordResetLink(){
      if(this.userNameForm.valid){
        this.userApiService.sendPasswordLink(this.userNameForm.controls['username'].value).subscribe({
          next : (res : any) => {
            this.message.SucessMessage(res);
            this.responseMessage = res;
          },
          error : (err) => {
            this.message.ErrorMessage(err);
          }
        })
      }
      else{
        this.userNameForm.markAllAsTouched();
      }
      
    }
}
