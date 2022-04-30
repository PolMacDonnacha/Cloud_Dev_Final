import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../models/product';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() cartContents: IProduct[] = [];
  constructor(private cartServ: ShoppingCartService,private auth: AuthService) { }

  ngOnInit(): void {
    this.getItems();
    this.cartContents = this.cartServ.getCartItems()
  }

  getItems(){
    return this.cartServ.getCartItems()
  }

  checkout(){
    this.auth.getAuthenticatedUser()!.getSession((err: any, session: any) => {
      if (err) {
        console.log(err);
        return;
      }
      this.cartServ.checkout(this.cartContents, session)
    })
    this.cartContents = this.cartServ.getCartItems()
  }

}
