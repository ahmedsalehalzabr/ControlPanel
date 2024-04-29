import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPost } from '../models/blog-post.model';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { UpdateBlogPostModel } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http:HttpClient) { }

  createBlogPost(data:AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>( `${environment.baseUrl}/api/Item?addAuth=true`,data);
  }

  getAllBlogPost(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>( `${environment.baseUrl}/api/Item`);
  }

  getBlogPostById(id:string) : Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.baseUrl}/api/Item/${id}`);
  }
  


  updateBlogPost(id: string, updatedBlogPost: UpdateBlogPostModel): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${environment.baseUrl}/api/Item/${id}?addAuth=true`, updatedBlogPost);
  }

  deleteBlogPost(id:string) : Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${environment.baseUrl}/api/Item/${id}?addAuth=true`);
  }

}
