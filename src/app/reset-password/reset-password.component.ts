import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  resetPasswordForm !: FormGroup;
  responseMessage : string = "";
  confirmNewPassword = new FormControl('');
  resetPasswordToken : string = "";
    
      constructor(private fb : FormBuilder, private backend : BackendService, private route : ActivatedRoute,
        private router : Router, private message: ToastService, private authService : AuthService){
        this.resetPasswordForm = this.fb.group({
          newPassword : ['', [Validators.required]],
          token : ['']
        })
      }

    ngOnInit() : void{
      let token = this.route.snapshot.queryParamMap.get('resetToken');
      this.resetPasswordToken = token ?? "";
    }
  
  
      resetPassword(){

        this.resetPasswordForm.patchValue({
          token : this.resetPasswordToken
        })

        if(this.resetPasswordForm.valid){

          console.log(this.resetPasswordForm.value);

          this.backend.resetPassword(this.resetPasswordForm.value).subscribe({
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
          this.resetPasswordForm.markAllAsTouched();
        }
        
      }
}
