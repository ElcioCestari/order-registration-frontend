import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/header/header.component';
import { NavComponent } from './core/nav/nav.component';
import { SectionComponent } from './section/section.component';
import { FooterComponent } from './core/footer/footer.component';
import { ProductCreateComponent } from './product/components/product-create/product-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProductListComponent } from './product/components/product-list/product-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserCreateComponent } from './user/components/user-create/user-create.component';
import { UserLoginComponent } from './user/components/user-login/user-login.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { ProductUpdateComponent } from './product/components/product-update/product-update.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from './core/components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NavMobileComponent } from './core/nav/nav-mobile/nav-mobile.component';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './home/home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthInterceptorService } from './core/services/auth-interceptor.service';
import {MatTooltipModule} from "@angular/material/tooltip";
import { QuantityPatchComponent } from './product/components/product-patch/quantity-patch/quantity-patch.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    SectionComponent,
    FooterComponent,
    ProductCreateComponent,
    ProductListComponent,
    UserCreateComponent,
    UserLoginComponent,
    UserListComponent,
    ProductUpdateComponent,
    ConfirmDialogComponent,
    NavMobileComponent,
    HomeComponent,
    QuantityPatchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatOptionModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
