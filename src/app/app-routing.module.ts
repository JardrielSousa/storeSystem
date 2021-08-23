import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/product', pathMatch: 'full' },
{ path: 'product', component: ProductComponent },
{ path: 'user', component: UserComponent },
{ path:'create-product',component:CreateProductComponent}
// { path: 'editDoctor/:id/:del', component: EditDoctorComponent },
// { path: 'specialties', component: SpecialtiesComponent },
// { path: 'addSpecialties', component: AddSpecialtiesComponent },
// { path: 'editSpecialties/:id/:del', component: EditSpecialtiesComponent }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
