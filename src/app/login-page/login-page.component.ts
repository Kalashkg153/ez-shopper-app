import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  loginForm !: FormGroup;

  constructor(private fb : FormBuilder, private backend : BackendService, 
    private router : Router, private message: ToastService, private authService : AuthService){
    this.loginForm = this.fb.group({
      username : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    })
  }

  ngOnInit(){

  }


  userLogin(){
    console.log(this.loginForm);
    console.log(this.loginForm.valid);
    if(this.loginForm.valid){
      console.log("called");
      this.backend.loginUser(this.loginForm.value).subscribe({
        next : (res) => {
          console.log(res);
          
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
          console.log(err);
          this.message.ErrorMessage(err);
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
}
