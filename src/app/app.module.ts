import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './core/header/header.component';
import {NavComponent} from './core/nav/nav.component';
import {SectionComponent} from './section/section.component';
import {FooterComponent} from './core/footer/footer.component';
import {ProductCreateComponent} from './product/components/product-create/product-create.component';
import {ProductListComponent} from './product/components/product-list/product-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {UserCreateComponent} from './user/components/user-create/user-create.component';
import {UserLoginComponent} from './user/components/user-login/user-login.component';
import {UserListComponent} from './user/components/user-list/user-list.component';
import {ProductUpdateComponent} from './product/components/product-update/product-update.component';
import {ConfirmDialogComponent} from './core/components/confirm-dialog/confirm-dialog.component';
import {NavMobileComponent} from './core/nav/nav-mobile/nav-mobile.component';
import {HomeComponent} from './home/home.component';
import {AuthInterceptorService} from './core/services/auth-interceptor.service';
import {QuantityPatchComponent} from './product/components/product-patch/quantity-patch/quantity-patch.component';
import {UserUpdateComponent} from './user/user-update/user-update.component';
import {MaterialModule} from "./material/material.module";

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
    QuantityPatchComponent,
    UserUpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
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
