import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  image: File | undefined;

  productForm = this.formBuilder.group({
    Name: '',
    Category: '',
    Price: 0,
    Image: null

  });

  constructor(private formBuilder: FormBuilder, private prd: ProductService, private auth: AuthService) { }

  ngOnInit(): void {
  }
  imageChanged(event: any) {
    console.log(event.target!!.files)
    this.image = event.target!!.files[0]
    this.productForm.patchValue({
      fileSource: event.target!!.files[0]
    });
  }

  AddPrduct(){
    this.auth.getAuthenticatedUser()!.getSession((err: any, session: any) => {
      if (err) {
        console.log(err);
        return;
      }
this.prd.uploadProduct(session, this.productForm.value)
});

}
}
