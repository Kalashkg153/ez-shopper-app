import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ToastService } from '../../services/toast.service';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [NgbModalModule],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent {

  @ViewChild('updateOrderStatusContent', { static: true }) contentTemplate!: TemplateRef<any>;

  constructor(private backend : BackendService, private message : ToastService, private modalService : NgbModal){

  }

  orders : any;
  UpdatedOrderStatus = new FormControl('');

  ngOnInit(){
    this.getAllOrders();
  }

  getAllOrders(){
    this.backend.getAllOrder().subscribe({
      next : (res) => {
        console.log(res);
        if(res == null){
          this.message.InfoMessage("No Orders Found");
        }
        else{
          this.orders = res;
        }

      },
      error : (err) => {
        console.log(err);
        console.log(err.status);
        if(err.error){
          this.message.ErrorMessage(err.error);
        }
        else{
          this.message.ErrorMessage("Server Error");
        }
        
      }
    })
  }

  openUpdateOrderStatusModal(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true, size: 'lg' });
	}


  UpdateOrderStatus(orderid : any){
    this.backend.updateOrderStatus(orderid, this.UpdatedOrderStatus);
  }
}
