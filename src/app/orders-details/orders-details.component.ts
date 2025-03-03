import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-orders-details',
  standalone: true,
  imports: [],
  templateUrl: './orders-details.component.html',
  styleUrl: './orders-details.component.css'
})
export class OrdersDetailsComponent {

  orders : any[] = [];
  username : any;

  constructor(private backend : BackendService, private auth : AuthService, private message : ToastService){

  }
  
  ngOnInit(){

    this.auth.user$.subscribe((res) => {
      this.username = res?.username;
    })

    this.backend.getOrders(this.username).subscribe({
      next : (res : any) => {
        console.log(res);
        this.orders = res;
      },
      error : (err) => {
        console.log(err);
      }
    })
  }



  CancelOrder(orderId : any){
    this.backend.cancelOrder(orderId).subscribe({
      next : (res : any) => {
        this.message.SucessMessage(res + orderId);
      },
      error : (err) => {
        console.log(err);
      }
    })
  } 
}
