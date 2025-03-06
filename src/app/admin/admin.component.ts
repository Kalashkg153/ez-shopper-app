import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet , RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {


  constructor(private router : Router){}

  ngOnInit() : void {
    alert("You must Logged in as a Administrator for these Services");

    this.router.navigateByUrl("admin/add-product");    
  }
  
}
