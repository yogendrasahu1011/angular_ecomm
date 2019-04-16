import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { UserComponent } from './components/user.component';
//import { HomeComponent } from './components/home.component';
import { UserService } from './Service/user.service'
//import { SupplierService } from './Service/supplier.service';
//import { SupplierComponent } from './components/supplier.component';
import { ProductService } from './Service/product.service';
import { ProductComponent } from './components/product.component';

import { UserFilterPipe } from './Filter/user.pipe';
import { SearchComponent } from './Shared/search.component';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipe } from './Filter/product.pipe';
import { CompanyFilterPipe } from './Filter/company.pipe';
import { CompanyComponent } from './components/company.component';
import { CompanyService } from './Service/company.service';
import { POService } from './Service/po.service'
import { POComponent } from './components/po.component';
import { CartComponent } from './components/cart.component';


@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpModule, routing, Ng2Bs3ModalModule],
    declarations: [AppComponent, SearchComponent, CompanyComponent, CartComponent, POComponent, ProductComponent, ProductFilterPipe, CompanyFilterPipe, UserFilterPipe, UserComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, CompanyService, POService, ProductService,UserService],
    bootstrap: [AppComponent]

})
export class AppModule { }
