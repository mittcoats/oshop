import { Cart } from "./cart";

export class Order {
  time: number;
  items: any[];

  constructor(
    cart: Cart,
    public shipping: any,
    public userId: string
  ) {
    this.time = new Date().getTime();

    this.items = cart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    })
  }
}