import { Category } from "../../category/models/category.model";

export interface BlogPost {
    id:string;
    title: string;
    shortDescription: string;
    featuredImageUrl: string;
    urlHandle: string;
    publishedDate: Date;
   // categories: Category[];
  }