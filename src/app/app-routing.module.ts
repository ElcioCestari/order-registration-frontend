import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './product/components/product-create/product-create.component';
import { ProductListComponent } from './product/components/product-list/product-list.component';

const routes: Routes = [
  {
    path: 'products/list',
    component: ProductListComponent
  },
  {
    path: 'products/create',
    component: ProductCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
