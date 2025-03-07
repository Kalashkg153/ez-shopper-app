import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { ToastService } from '../../services/toast.service';
import { ProductApiService } from '../../services/product-api.service';
import { SuccessResponse } from '../../models/successResponse';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  productForm !: FormGroup;
  categories : any;

  constructor(private fb: FormBuilder, private productApi : ProductApiService, private message : ToastService, private backend : BackendService) {}

  ngOnInit(): void {
    this.getCategories();
    this.productForm = this.fb.group({
      title: ['Test', [Validators.required]],
      description: ['Test', Validators.required],
      imageData: [''],
      price: ['12000', [Validators.required, Validators.min(1)]],
      stock: ['120', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      discount: ['12', [Validators.min(0)]],
      discountedPrice: [''],
      isTrending: [false],
      isLatestProduct: [false]
    });
  }

  onSubmit(): void {

    if (this.productForm.valid) {

      if(this.productForm.controls['discount'].value){
        let price = this.productForm.controls['price'].value;
        let discount = this.productForm.controls['discount'].value
        let discountedPrice = price - ((price*discount)/100);
        this.productForm.patchValue({
          discountedPrice : discountedPrice
        })
      }

      this.productApi.addNewProduct(this.productForm.value).subscribe({
        next : (res : SuccessResponse) => {
          this.message.SucessMessage(res.message);
          this.productForm.reset();
        },
        error : (err) => {
          console.log(err);
          this.message.ErrorMessage(err.error);
        }
      })
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onFileInput(e : Event) : void{
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);
      
      // Read file data if needed
      const reader = new FileReader();
      reader.onload = () => {
        // console.log('File content:', reader.result);
        const result = reader.result as string;
        const base64String = result.split(',')[1];
        this.productForm.patchValue({
          imageData: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  }

  getCategories(){
    this.backend.getCategories().subscribe({
      next : (res) => {
        if(res == null){
          this.message.InfoMessage("No Categories Found");
        }
        else{
          this.categories = res;
        }
        
      },
      error : (err) => {
        this.message.ErrorMessage(err.error);
      }
    })
  }
}
