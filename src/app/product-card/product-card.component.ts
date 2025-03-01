import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ProductCard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product !: Product;
  
}
