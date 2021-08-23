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

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private productService:ProductService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  product:any;
  productForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(256)],
    ],
    price: [0.0, [CustomValidator.numeric]],
    quantity: [
      0.0,[CustomValidator.numeric]
    ],
  });


  onSubmit(){
    this.productForm.markAllAsTouched();
    console.log(
      this.productForm.value
    );
    this.productService.create({name:'teste',price:'11',quantity:50});

  }

  get f() {
    return this.productForm.controls
  }
}
