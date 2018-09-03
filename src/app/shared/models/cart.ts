import { CartItem } from "shared/models/cart-item";
import { Product } from "shared/models/product";

export class Cart {
  items: CartItem[] = []

  constructor(
    private itemsMap: { [productId: string]: CartItem }
  ) {
    this.itemsMap = itemsMap || {};

    for (let productId in itemsMap) {
      let item = itemsMap[productId]
      this.items.push(new CartItem({...item, $key: productId }))
    }
  }
  
  get itemCount() {
    let count = 0 
      for (let productId in this.items) {
        count += this.items[productId].quantity;
      }
    return count;
  }

  get totalPrice() {
    let sum = 0;
    for(let id in this.items){
      sum += this.items[id].totalPrice;
    }
    return sum
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.$key]
    return item ? item.quantity : 0;
  }
}