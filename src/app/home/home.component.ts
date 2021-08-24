import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  products:any=[];
  constructor(
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.productService.readAll().
    subscribe((resp:any)=>{
      this.products = resp
      console.log(this.products);
    });
  }

}
