import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbCollapseModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgbCollapseModule, NgbModalModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  @ViewChild('content', { static: true }) contentTemplate!: TemplateRef<any>;

  userDetails : any;
  userCart : any;
  orderForm !: FormGroup
  isCollapse = true;
  useSavedAddress = new FormControl(false); 
  useDiffrentAddress = new FormControl(false);
  deliveryAddress = new FormControl('');
  pincode = new FormControl('');
  paymentType = new FormControl('');

  constructor(private backend : BackendService, private datepipe : DatePipe, private modalService : NgbModal, private message : ToastService, private auth : AuthService, private fb : FormBuilder){
    this.orderForm = this.fb.group({
        userId : ['', ],
        productIds : [[]],
        totalPrice: [''],
        deliveryAddress : [''],
        pincode : [''],
        paymentType : [''],
        orderedDate : []
    })
  }

  ngOnInit() : void{
    let username = sessionStorage.getItem("username");
    this.backend.getUserDetails(username).subscribe({
      next : (res) => {
        this.userDetails = res;
        this.userCart = res.cart
      },
      error : (err) => {
        console.log(err);
      }
    })

    this.useDiffrentAddress.valueChanges.subscribe(value => {
      if (value) {
        this.isCollapse = false;
        this.useSavedAddress.setValue(false);
        this.useSavedAddress.disable();
      } else {
        this.isCollapse = true;
        this.useSavedAddress.enable();
      }
    });
    // this.useSavedAddress.valueChanges.subscribe(value => {
    //   if (value) {
    //     this.isCollapse = true;
    //     this.useDiffrentAddress.disable();
    //   } else {
    //     this.isCollapse = false;
    //     this.useDiffrentAddress.enable();
    //   }
    // });
  }


  PlaceOrder(){

    let ProductsIds = [];
    for(let item of this.userCart.items){
      ProductsIds.push(item.productId);
    }

    this.orderForm.patchValue({
      userId : this.userDetails.email,
      productIds : ProductsIds,
      totalPrice : this.userCart.totalPrice,
      deliveryAddress : this.useDiffrentAddress.value ? this.deliveryAddress.value : this.userDetails.address,
      pincode : this.useDiffrentAddress.value ? this.pincode.value : this.userDetails.pincode,
      paymentType : this.paymentType.value,
      orderedDate : this.datepipe.transform(new Date(), "dd/MM/yyyy")
    })

    console.log(this.orderForm.value);
    this.backend.placeOrder(this.orderForm.value).subscribe({
      next : (res  : any) => {
        this.message.SucessMessage(res, 18000);
        this.openVerticallyCentered(this.contentTemplate);
      },
      error : (err) => {
        this.message.ErrorMessage(err);
      }
    })
  }

  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
}
