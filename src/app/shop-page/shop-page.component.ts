import { Component } from '@angular/core';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUpShortWide } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [CategoryBarComponent, FontAwesomeModule],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css'
})
export class ShopPageComponent {

  faArrowUpShortWide = faArrowUpShortWide;

}
