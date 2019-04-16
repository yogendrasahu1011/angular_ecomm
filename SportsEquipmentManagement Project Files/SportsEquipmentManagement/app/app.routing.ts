import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './components/user.component';
import { LoginComponent } from './components/login.component';
import { CartComponent } from './components/cart.component';
import { POComponent } from './components/po.component';
import { ProductComponent } from './components/product.component';
import { CompanyComponent } from './components/company.component';
import { LogoutComponent } from './components/logout.component';
import { popdfComponent } from './components/popdf.component';
import { forgotpasswordComponent } from './components/forgotpassword.component';

const appRoutes: Routes = [{ path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent },
    { path: 'company', component: CompanyComponent },
    { path: 'product', component: ProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'po', component: POComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'popdf', component: popdfComponent },
    { path: 'forgotpassword', component: forgotpasswordComponent }
   
];

export const routing: ModuleWithProviders = 
    RouterModule.forRoot(appRoutes);