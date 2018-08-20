import { CartItem } from "./cart-item";

export class Cart {

  constructor(
    public items: CartItem[]
  ) {}

  get itemCount() {
    let count = 0 
      for (let productId in this.items) {
        count += this.items[productId].quantity;
      }
    return count;
  }
}