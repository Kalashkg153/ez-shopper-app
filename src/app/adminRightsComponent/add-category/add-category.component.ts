import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ToastService } from '../../services/toast.service';
import { FormBuilder, FormGroup , FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  categories : any[] = [];
  categoryForm !: FormGroup

  constructor(private backend : BackendService, private message : ToastService, private fb : FormBuilder){

  }

  ngOnInit() : void{
    this.getCategories();
    this.categoryForm = this.fb.group({
          name: ['', [Validators.required]],
          categoryImageData: ['', Validators.required],
          isActive : [true]
        });
  }


  onFileInput(e : Event){
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
        this.categoryForm.patchValue({
          categoryImageData: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  }


  addCategory(){
    if(this.categoryForm.valid){
      this.backend.addNewCategory(this.categoryForm.value).subscribe({
        next : (res : any) => {
          this.message.SucessMessage(res);
          this.categoryForm.reset();
        },
        error : (err) => {
          console.log(err);
          this.message.ErrorMessage(err);
        }
      })
    }
    else{
      this.categoryForm.markAllAsTouched();
    }
  }


  getCategories(){
    this.backend.getCategories().subscribe({
      next : (res) => {
        console.log(res);
        this.categories = res;
      },
      error : (err) => {
        console.log(err)
        this.message.ErrorMessage(err);
      }
    })
  }


  deleteCategory(categoryId : string){
    this.backend.deleteCategory(categoryId).subscribe({
      next : (res : any) => {
        this.message.SucessMessage(res);
        this.getCategories();
      },
      error : (err) => {
        console.log(err);
        this.message.ErrorMessage(err);
      }
    })
  }


}
