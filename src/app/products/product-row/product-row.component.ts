import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.css']
})
export class ProductRowComponent implements OnInit {
  @Input() product!: IProduct;
  constructor(private cartServ: ShoppingCartService) { }

  ngOnInit(): void {
  }

  clicked(product:IProduct){
    console.table(product)
    this.cartServ.addToCart(product);
  }
}
