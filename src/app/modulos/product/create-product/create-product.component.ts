import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/IProduct';
import { ProductService } from 'src/app/service/product.service';
import { CustomValidator } from 'src/app/validators/CustomValidator';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.sass']
})
export class CreateProductComponent implements OnInit {
    product:any;
    isCreation=false;
    isDelete = false;
    id:any;
  errorMessage: any;
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private productService:ProductService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const del = this.route.snapshot.paramMap.get('del');

    this.isDelete = (del === "true")
    if(id){
      this.id = id;
      this.productService.readById(id).subscribe((resp:any)=>{
        this.product = resp
      });
      this.isCreation = false;
    }else{
      this.isCreation = true;
    }
  }

  productForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(256)],
    ],
    price: [0.0, [Validators.required,CustomValidator.numeric]],
    quantity: [
      0.0,[Validators.required,CustomValidator.numeric]
    ],
  });


  onSubmit(){
    this.productForm.markAllAsTouched();
    this.productService.create(this.productForm.value).subscribe(product=>{
        this.productService.verMsg('product created!!',false);
      });
    this.router.navigate(['product']);

  }

  onDelete(){
    this.productService.delete(this.id)
    .subscribe((resp:any)=>{
      this.productService.verMsg('product delete!!',false);
      this.router.navigate(['product']);
    });
  }

  onChange(){
    this.productService.update(this.id, this.productForm.value).subscribe(product=>{
      this.productService.verMsg('product changed!!',false);
    }, error =>{this.errorMessage = error.message
      this.productService.verMsg(error.message,true);
    });
  }

  get f() {
    return this.productForm.controls
  }
}
