import {NgModule} from '@angular/core';
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductUpdateComponent} from "./components/product-update/product-update.component";
import {QuantityPatchComponent} from "./components/product-patch/quantity-patch/quantity-patch.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductCreateComponent} from "./components/product-create/product-create.component";
import {SharedModule} from "../shared/shared.module";
import {ProductMapper} from "./mappers/product.mapper";
import {ProductService} from "./services/product.service";


@NgModule({
  declarations: [
    ProductListComponent,
    QuantityPatchComponent,
    ProductUpdateComponent,
    ProductCreateComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    ProductMapper,
    ProductService
  ]
})
export class ProductModule {
}
