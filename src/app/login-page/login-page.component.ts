import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ButtonSpinnerComponent } from '../button-spinner/button-spinner.component';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, ButtonSpinnerComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  loginForm !: FormGroup;
  isLoading : boolean = false;

  constructor(private fb : FormBuilder, private backend : BackendService, private userApiService : UserApiService,
    private router : Router, private message: ToastService, private authService : AuthService){
    this.loginForm = this.fb.group({
      username : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    })
  }

  ngOnInit(){

  }


  userLogin(){
    if(this.loginForm.valid){
      this.isLoading = true;
      this.userApiService.loginUser(this.loginForm.value).subscribe({
        next : (res) => {
          console.log(res);
          this.isLoading = false;
          if(res.token != null){
            this.authService.setLoginDetails(res);
            this.message.SucessMessage(res.message);
            this.router.navigateByUrl("");
          }
          else{
             this.message.ErrorMessage(res.message);
          }
        },
        error : (err) => {
          this.isLoading = false;
          console.log(err);
          this.message.ErrorMessage(err.error);
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
}
