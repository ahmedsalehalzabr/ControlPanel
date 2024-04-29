import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';

import { HomeComponent } from './features/public/home/home.component';
import { DetailsComponent } from './features/public/details/details.component';
import { LoginComponent } from './features/Auth/login/login.component';
//import { authGuard } from './features/Auth/guards/auth.guard';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { authGuard } from './features/Auth/guards/auth.guard';

const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'blog/:url', component: DetailsComponent},
{path: 'login', component: LoginComponent},
{path: 'admin/categories', component: CategoryListComponent
  ,canActivate:[authGuard]
},
{path:'admin/categories/add', component: AddCategoryComponent
,canActivate:[authGuard]
},
{path:'admin/categories/:id', component: EditCategoryComponent
,canActivate:[authGuard]
},
{path:'admin/blogposts', component: BlogpostListComponent
,canActivate:[authGuard]
},
{path:'admin/blogposts/add', component: AddBlogpostComponent
,canActivate:[authGuard]
},
{path:'admin/blogposts/:id', component: EditBlogpostComponent
,canActivate:[authGuard]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
