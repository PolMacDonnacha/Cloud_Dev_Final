import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response, IProduct } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  productList: IProduct[] | undefined;
  body: Body | undefined;
  allItems: IProduct[] | undefined;
  message: string = "";
  product: IProduct | undefined;
  selectedProduct: IProduct | undefined;

  constructor(private router: Router,private auth: AuthService,private productService: ProductService, ) {

   }


   ngOnInit(): void {
    this.auth.getAuthenticatedUser()!.getSession((err: any, session: any) => {
      if (err) {
        console.log(err);
        return;
      }
    this.productService.getProducts(session).subscribe((response : Response) =>
      {
        this.body = JSON.parse(JSON.stringify(response)).body;
        
        this.allItems = JSON.parse(JSON.parse(JSON.stringify(this.body)))
        this.productList = JSON.parse(JSON.stringify(this.allItems)).Items
        console.log(JSON.parse(JSON.stringify(this.allItems)).Items)
        console.table(this.productList!!)

      })
    this.selectedProduct = null!;
  });
}

  sortedProducts(parameter: any):IProduct[]{
    if (parameter != null){
      switch(parameter){
        case "price":
          return this.productList!.sort((a:IProduct, b:IProduct) => a.Price - b.Price);
          case "name":
          return this.productList!.sort((a:IProduct, b:IProduct) => a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0);
          default:
          return this.productList!;
      }
    }
    return this.productList!;
    
  }

  clicked (product: IProduct): void {
    if(product != null){

    }
  }

}
