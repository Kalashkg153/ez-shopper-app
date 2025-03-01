import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ez-shopper';

  constructor(private cartService : CartService, private auth : AuthService){

  }

  ngOnInit() : void {  
    let username;
    this.auth.user$.subscribe((user) => {
      username = user?.username;
    })
    if(username){
      this.cartService.updateCart(username);
    }
    
  }
}
