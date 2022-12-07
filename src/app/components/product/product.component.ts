import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  
  products: Product[] = [];
  dataLoaded=false;
  filterText="";
  
  constructor(private productService:ProductService, 
    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["categoryID"]) {
        this.getProductsByCategory(params["categoryID"]);
      } else {
        this.getProducts();
      }
    });
  }
  getProducts() { //asenkron yapı
    this.productService.getProducts().subscribe(response=>{
      this.products=response.data;
      this.dataLoaded=true;
    })
  }

  getProductsByCategory(categoryId:number) { //asenkron yapı
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
      this.products=response.data;
      this.dataLoaded=true;
    })
  }



}