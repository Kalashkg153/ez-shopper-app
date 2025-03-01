import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { ToastService } from '../services/toast.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  registerForm !: FormGroup;
  confirmPassword  = new FormControl('');
  passwordError : string = "";
  
    constructor(private fb : FormBuilder, private backend : BackendService, 
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
        this.backend.registerUser(this.registerForm.value).subscribe({
          next : (res) => {
            if(res.includes("Created ")){
              this.message.SucessMessage(res);
              this.router.navigateByUrl("login");
            }
            else{
              this.message.ErrorMessage(res);
            }
          },
          error : (err) => {
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
