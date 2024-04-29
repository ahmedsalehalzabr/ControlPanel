import { BlogPost } from "../../blog-post/models/blog-post.model";

export interface Category {

   id:string;
   name:string;
   urlHandle:string;
   shortDescription: string;
   featuredImageUrl: string;
   items: BlogPost[];
}