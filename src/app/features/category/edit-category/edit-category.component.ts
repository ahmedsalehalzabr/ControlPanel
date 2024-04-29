import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

import { UpdateCategoryRequest } from '../models/update-category-request.model';
import {  Router } from '@angular/router';
import { ImageService } from '../../../shared/components/image-selector/image.service';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { BlogPostService } from '../../blog-post/services/blog-post.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit , OnDestroy {

id: string | null = null;
paramsSubscription?: Subscription;
editCategorySubscription?: Subscription;
imageSelectSubscricption?: Subscription;
category? : Category;
isImageSelectorVisible : boolean = false;
items$?: Observable<BlogPost[]>;
selectedCategory?: string[];

updateBlogPostSubscription?: Subscription;

deleteBlogPostSubscription?: Subscription;


  constructor (private route: ActivatedRoute, private categoryServices: CategoryService,
   private router:Router, private imageService: ImageService, private blogPostService:BlogPostService) {

  }

  onFormSubmit(): void {
     const updateCategoryRequest : UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
      featuredImageUrl:this.category?.featuredImageUrl ?? '',
      shortDescription:this.category?.shortDescription ?? '',
      items: this.selectedCategory ?? []
     
     };

     if(this.id)
      {
      this.updateBlogPostSubscription =  this.categoryServices.updateCategory(this.id, updateCategoryRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          }
        });
      }
  }

ngOnInit(): void {
  
this.items$ = this.blogPostService.getAllBlogPost();

 this.paramsSubscription = this.route.paramMap.subscribe({
    next: (params) => {
      this.id = params.get('id');


      if (this.id)
        {
         this.editCategorySubscription = this.categoryServices.getCategoryById(this.id)
          .subscribe({
            next : (response) => {
              this.category = response;
            }
          });
        }
        this.imageSelectSubscricption = this.imageService.onSelectImage()
        .subscribe({
          next: (response) => {
            if (this.category) {
              this.category.featuredImageUrl = response.url;
              this.isImageSelectorVisible = false;
            }
          }
        })
    }
  })

}

onDelete() : void {
  if(this.id)
    {
    this.deleteBlogPostSubscription =  this.categoryServices.deleteCategory(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
}

openImageSelector() :void {
  this.isImageSelectorVisible = true;
}

closeImageSelector() : void {
  this.isImageSelectorVisible = false;
}
ngOnDestroy(): void {
  this.paramsSubscription?.unsubscribe();
  this.editCategorySubscription?.unsubscribe();
  this.imageSelectSubscricption?.unsubscribe();

  this.updateBlogPostSubscription?.unsubscribe();

  this.deleteBlogPostSubscription?.unsubscribe();
}
}
