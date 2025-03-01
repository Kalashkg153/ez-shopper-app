import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'CategoryBar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './category-bar.component.html',
  styleUrl: './category-bar.component.css'
})
export class CategoryBarComponent {

  categories : any;

  constructor(private backend : BackendService, private router : Router){

  }

  ngOnInit() : void {
    this.getCategories();
  }


  getCategories(){
    this.backend.getCategories().subscribe({
      next : (res) => {
        this.categories = res;
      },
      error : (err) => {
        console.log(err);
      }
    });
  }
}
