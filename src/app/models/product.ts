export class Product {
    
    productId : string;
    productTitle : string;
    productDescription : string;
    productPrice : number;
    productDiscountedPrice : number;
    productImageData : string;
    productDiscountPercentage : number;
    productStock : number;
    productCategory : string;
    productRating : number;

     constructor( data : any){
        this.productId = data.id;        
        this.productTitle = data.title;
        this.productPrice = data.price;
        this.productImageData = data.imageData;
        this.productDiscountedPrice = data.discountedPrice
        this.productDiscountPercentage = data.discount
        this.productDescription = data.description;
        this.productStock = data.stock;
        this.productCategory = data.category;
        this.productRating = Math.round((Math.random() * 4) + 1.5);
     }
}