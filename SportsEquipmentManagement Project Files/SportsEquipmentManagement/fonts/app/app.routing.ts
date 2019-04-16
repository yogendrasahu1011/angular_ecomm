import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './components/user.component';
//import { HomeComponent } from './components/home.component';
import { CartComponent } from './components/cart.component';
import { POComponent } from './components/po.component';
import { ProductComponent } from './components/product.component';
import { CompanyComponent } from './components/company.component';

const appRoutes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
    
    //{ path: 'home', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'company', component: CompanyComponent },
    { path: 'product', component: ProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'po', component: POComponent }
];

export const routing: ModuleWithProviders = 
    RouterModule.forRoot(appRoutes);