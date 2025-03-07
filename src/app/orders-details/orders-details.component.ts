import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { SuccessResponse } from '../models/successResponse';

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
        if(res == null){
          this.message.InfoMessage("You do not have any Orders")
        }
        this.orders = res;
      },
      error : (err) => {
        this.message.ErrorMessage(err.error);
      }
    })
  }



  CancelOrder(orderId : any){
    this.backend.cancelOrder(orderId).subscribe({
      next : (res : SuccessResponse) => {
        this.message.SucessMessage(res.message);
      },
      error : (err) => {
        console.log(err.error);
      }
    })
  } 
}
