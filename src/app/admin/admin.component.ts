import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet , RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {


  constructor(private router : Router, private auth  : AuthService){}

  ngOnInit() : void {

    let user;
    this.auth.user$.subscribe((res) => {
      user = res;
    })

    if(user){
      alert("You must Logged in as a Administrator for these Services");
      this.router.navigateByUrl("admin/add-product"); 
    }
    else{
      alert("You must Login Before Proceeding");
      this.router.navigateByUrl("");
    }   
  }
  
}
