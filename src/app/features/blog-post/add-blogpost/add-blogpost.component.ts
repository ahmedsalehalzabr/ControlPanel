import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import {  Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
model:AddBlogPost;
isImageSelectorVisible : boolean = false;
categories$?: Observable<Category[]>;
imageSelectorSubscription?: Subscription;

constructor (
   private blogPostService:BlogPostService,
   private router:Router,
  
   private imageService:ImageService) {
  this.model = {
    title: '',
    shortDescription: '',
    urlHandle: '',
  
    featuredImageUrl: '',
    price:0,
    discount:0,
  priceDiscount:0,
  
    publishedDate: new Date(),
    
  }
}

ngOnInit(): void { 


  this.imageSelectorSubscription = this.imageService.onSelectImage()
  .subscribe({
   next: (selectedImage) => {
     this.model.featuredImageUrl = selectedImage.url;
     this.closeImageSelector();
   }
  })
}

onFormSubmit(): void {
this.blogPostService.createBlogPost(this.model).subscribe({
  next: (response) => {
    this.router.navigateByUrl('/admin/blogposts')
  }
});
}
openImageSelector() :void {
  this.isImageSelectorVisible = true;
}

closeImageSelector() : void {
  this.isImageSelectorVisible = false;
}

ngOnDestroy(): void {
  this.imageSelectorSubscription?.unsubscribe();
}

}
