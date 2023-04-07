import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './core/header/header.component';
import {NavComponent} from './core/nav/nav.component';
import {SectionComponent} from './section/section.component';
import {FooterComponent} from './core/footer/footer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {UserCreateComponent} from './user/components/user-create/user-create.component';
import {UserLoginComponent} from './user/components/user-login/user-login.component';
import {UserListComponent} from './user/components/user-list/user-list.component';
import {ConfirmDialogComponent} from './core/components/confirm-dialog/confirm-dialog.component';
import {NavMobileComponent} from './core/nav/nav-mobile/nav-mobile.component';
import {HomeComponent} from './home/home.component';
import {AuthInterceptorService} from './core/services/auth-interceptor.service';
import {UserUpdateComponent} from './user/user-update/user-update.component';
import {MaterialModule} from "./material/material.module";
import {ProductModule} from "./product/product.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    SectionComponent,
    FooterComponent,
    UserCreateComponent,
    UserLoginComponent,
    UserListComponent,
    ConfirmDialogComponent,
    NavMobileComponent,
    HomeComponent,
    UserUpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ProductModule
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
export class AppModule {
}
