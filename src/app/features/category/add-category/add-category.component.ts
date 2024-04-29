import { Component, OnDestroy, OnInit } from '@angular/core';
import { addCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ImageService } from '../../../shared/components/image-selector/image.service';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy ,OnInit {

model: addCategoryRequest;
items$?: Observable<BlogPost[]>;
private addCategorySubscribtion?:Subscription;
isImageSelectorVisible : boolean = false;
imageSelectorSubscription?: Subscription;
constructor(private categoryServices:CategoryService,
  private router:Router,private imageService:ImageService, private blogPostService:BlogPostService) {
  this.model ={
    name:'',
    urlHandle:'',
    featuredImageUrl:'',
    shortDescription:'',
    items: []
    
  };
}
 
ngOnInit(): void {
  this.items$ = this.blogPostService.getAllBlogPost();

  this.imageSelectorSubscription = this.imageService.onSelectImage()
  .subscribe({
   next: (selectedImage) => {
     this.model.featuredImageUrl = selectedImage.url;
     this.closeImageSelector();
   }
  });
}
  onFormSubmit() {

    this.addCategorySubscribtion =  this.categoryServices.addCategory(this.model)
     .subscribe({
      next: (response) => { 
         this.router.navigateByUrl('/admin/categories')
      }
     });

  
  }
// في وقت لاحق عندما تحتاج إلى إلغاء الاشتراك
  ngOnDestroy(): void {
    this.addCategorySubscribtion?.unsubscribe();
    this.imageSelectorSubscription?.unsubscribe();
  }

  openImageSelector() :void {
    this.isImageSelectorVisible = true;
  }
  
  closeImageSelector() : void {
    this.isImageSelectorVisible = false;
  }
}
