import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductCreateComponent} from "./components/product-create/product-create.component";

const routes: Routes = [
  {
    path: "products",
    component: ProductCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
