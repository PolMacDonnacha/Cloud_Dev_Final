import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { NewProductComponent } from './products/new-product/new-product.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
     path: 'signup',
      component: SignUpComponent,
  }
  ,
  {
     path: 'login',
      component: SignInComponent,
  },
  {
    path: 'products',
    component: ProductsListComponent,
  },
  {
    path: 'productForm',
    component: NewProductComponent,
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
