import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './modulos/login/login.component';
import { CreateProductComponent } from './modulos/product/create-product/create-product.component';
import { ProductComponent } from './modulos/product/product.component';
import { UserComponent } from './modulos/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: UserComponent },
  { path: 'create-product',component: CreateProductComponent},
  { path: 'edit-product/:id/:del', component: CreateProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
