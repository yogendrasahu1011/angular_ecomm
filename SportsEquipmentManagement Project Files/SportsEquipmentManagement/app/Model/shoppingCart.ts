import { productItem } from '../Model/productitem';

export class Shoppingcart {
    Id: number;
    userId: number;
    productitemList: productItem[];
}
/*

export class userItem {
    Quantity: number;
    Subtotal: number;
    product: IProduct;

}

export interface IProduct {
    Id: number,
    MaterialID: string,
    Description: string,
    Price: number,
    Inventory: number,
    SupplierCompany: string,
    Imagepath:string
}

*/