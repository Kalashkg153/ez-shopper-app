export interface ProductResponse{
    id : string,
    title : string,
    description : string,
    imageData : string,
    price : number,
    stock : number,
    category  : string,
    discount : number,
    discountedPrice : number,
    isTrending :  boolean,
    isLatestProduct : boolean
}