import { Product } from "./product";

export class CartItem {  
  $key: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
  
  // constructor(
  //   public product: Product,
  //   public quantity: number
  // ) {}

  get totalPrice() {
    return this.quantity * this.price
  }
}