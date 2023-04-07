import {NgModule} from '@angular/core';
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductUpdateComponent} from "./components/product-update/product-update.component";
import {QuantityPatchComponent} from "./components/product-patch/quantity-patch/quantity-patch.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "../material/material.module";
import {FormsModule} from "@angular/forms";
import {ProductCreateComponent} from "./components/product-create/product-create.component";


@NgModule({
  declarations: [
    ProductListComponent,
    QuantityPatchComponent,
    ProductUpdateComponent,
    ProductCreateComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ]
})
export class ProductModule {
}
