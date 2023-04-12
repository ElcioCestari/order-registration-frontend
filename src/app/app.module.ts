import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './core/components/header/header.component';
import {NavComponent} from './core/components/nav/nav.component';
import {SectionComponent} from './core/components/section/section.component';
import {FooterComponent} from './core/components/footer/footer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from './core/components/confirm-dialog/confirm-dialog.component';
import {NavMobileComponent} from './core/components/nav/nav-mobile/nav-mobile.component';
import {HomeComponent} from './core/components/home/home.component';
import {AuthInterceptorService} from './core/services/auth-interceptor.service';
import {MaterialModule} from "./material/material.module";
import {ProductModule} from "./product/product.module";
import {UserModule} from "./user/user.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    SectionComponent,
    FooterComponent,
    ConfirmDialogComponent,
    NavMobileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ProductModule,
    UserModule
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
