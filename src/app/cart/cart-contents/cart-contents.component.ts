import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-cart-contents',
  templateUrl: './cart-contents.component.html',
  styleUrls: ['./cart-contents.component.css']
})
export class CartContentsComponent implements OnInit {
  @Input() product!: IProduct;
  constructor(private cartServ: ShoppingCartService) { }

  ngOnInit(): void {
  }

  remove(product: IProduct){
  this.cartServ.removeFromCart(product);
  }

}
