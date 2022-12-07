import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
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
    private activatedRoute:ActivatedRoute, 
    private toastrService:ToastrService,
    private cartService:CartService
    ) {}

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


  addToCart(product:Product){
    if (product.productID===1) {
      this.toastrService.error("Error","This product cannot be added to the cart(deneme amaçlı)");
    } else {
      this.toastrService.success("Added to Cart",product.productName)
      this.cartService.addToCart(product);
    }
    
    
  }


}