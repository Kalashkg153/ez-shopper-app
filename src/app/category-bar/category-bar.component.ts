import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'CategoryBar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './category-bar.component.html',
  styleUrl: './category-bar.component.css'
})
export class CategoryBarComponent {

  categories : any;

  constructor(private backend : BackendService, private router : Router, private message : ToastService){

  }

  ngOnInit() : void {
    this.getCategories();
  }


  getCategories(){
    this.backend.getActiveCategories().subscribe({
      next : (res) => {
        this.categories = res;
      },
      error : (err) => {
        this.message.ErrorMessage(err.error);
      }
    });
  }
}
