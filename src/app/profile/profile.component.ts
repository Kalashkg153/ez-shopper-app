import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toast.service';
import { BackendService } from '../services/backend.service';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgbModalModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  @ViewChild('content', { static: true }) contentTemplate!: TemplateRef<any>;
  @ViewChild('updatePasswordContent', { static: true }) updatePasswordContentTemplate!: TemplateRef<any>;

  profileForm!: FormGroup;
  updatePasswordForm !: FormGroup;
  userId : any;
  username : any;

  constructor(private modalService : NgbModal, private backend : BackendService, private userApiService : UserApiService,
    private fb: FormBuilder, private router : Router, private cartService : CartService, 
    private message : ToastService, private route : ActivatedRoute, private authService : AuthService){
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      role: [{ value: 'USER', disabled: true }]
    });

    this.updatePasswordForm = this.fb.group({
      oldPassword : ['', Validators.required],
      newPassword : ['', Validators.required]
    });
  }

  ngOnInit() : void{
    let username = this.route.snapshot.paramMap.get('username');
    this.username = username;
    console.log(username);
    this.getUserDetails(username);
  }

  getUserDetails(username : any){
    this.userApiService.getUserDetails(username).subscribe({
      next : (res) => {
        console.log(res);
        this.profileForm.patchValue({
          fullName : res.fullName,
          email : res.email,
          contact : res.contact,
          address : res.address,
          pincode : res.pincode
        })
        this.userId = res.id;
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  onSubmit(): void {
    console.log(this.profileForm.valid);
    if (this.profileForm.valid) {
      this.userApiService.updateProfile(this.profileForm.value, this.userId ).subscribe({
        next : (res : any) => {
          console.log(res);
          this.message.SucessMessage(res);
          this.getUserDetails(this.username);
        },
        error : (err) => {
          console.log(err);
        }
      })
    }
    else{
      this.profileForm.markAllAsTouched();
    }
  }

  onPasswordFormSubmit() : void {
    if (this.updatePasswordForm.valid) {
      this.userApiService.updateUserProfilePassword(this.updatePasswordForm.value, this.userId ).subscribe({
        next : (res : any) => {
          console.log(res);
          this.message.SucessMessage(res);
          this.getUserDetails(this.username);
        },
        error : (err) => {
          console.log(err);
        }
      })
    }
    else{
      this.updatePasswordForm.markAllAsTouched();
    }
  }

  logout(){
    this.authService.logout();
    this.cartService.updateCart("");
    this.message.SucessMessage("You have logged out Successfully");
    this.router.navigateByUrl("");
  }


  openUpdateProfileModal(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true, size: 'lg' });
	}

  openUpdatePasswordModal(updatePasswordContent: TemplateRef<any>) {
		this.modalService.open(updatePasswordContent, { centered: true, size: 'lg' });
	}
}
