import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { ToastService } from '../services/toast.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonSpinnerComponent } from '../button-spinner/button-spinner.component';
import { UserApiService } from '../services/user-api.service';



@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule, ButtonSpinnerComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  registerForm !: FormGroup;
  confirmPassword  = new FormControl('');
  passwordError : string = "";
  isSigningUp : boolean = false;
  
    constructor(private fb : FormBuilder, private backend : BackendService, private userApiService : UserApiService,
      private router : Router, private message: ToastService){
      this.registerForm = this.fb.group({
        email : ['', [Validators.required, Validators.email]],
        fullName : ['', [Validators.required]],
        contact : ['', [Validators.required]],
        address : ['', [Validators.required]],
        pincode : ['', [Validators.required]],
        password : ['', Validators.required]
      })
    }
  
    ngOnInit(){
  
    }

    userRegister(){
      if(this.registerForm.valid){
        this.isSigningUp = true;
        this.userApiService.registerUser(this.registerForm.value).subscribe({
          next : (res) => {
            this.isSigningUp = false;
              this.message.SucessMessage(res);
              this.router.navigateByUrl("login");
          },
          error : (err) => {
            this.isSigningUp = false;
            console.log(err);
          }
        })
      } 
      else{
        this.registerForm.markAllAsTouched();
      }
    }

    onConfirmPasswordChanged(){
      if(this.confirmPassword.value != this.registerForm.get('password')?.value){
        this.passwordError = "Confirm password must be the same as password!";
      }
      else{
        this.passwordError = "";
      }
    }
}
