import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { UtilityService } from './services/utility.service';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ez-shopper';

  isLoading : boolean = false;

  constructor(private cartService : CartService, private auth : AuthService, private utility : UtilityService ){

  }

  ngOnInit() : void {  
    let username;
    this.utility.loader$.subscribe((value) => {
      this.isLoading = value;
    })
    this.auth.user$.subscribe((user) => {
      username = user?.username;
    })
    if(username){
      this.cartService.updateCart(username);
    }
    
  }
}
