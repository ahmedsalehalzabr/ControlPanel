export interface UpdateBlogPostModel {
    title: string;
    shortDescription: string;
    featuredImageUrl: string;
    urlHandle: string;
    publishedDate: Date;
    price:number;
    discount:number;
    priceDiscount:number;
   // categories: string[];
}