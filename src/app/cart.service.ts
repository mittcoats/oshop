import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from './models/product';
import { Cart } from './models/cart';
import 'rxjs/add/operator/map';
import { Observable } from '../../node_modules/rxjs/Observable';

@Injectable()
export class CartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  async getCart(): Promise<Observable<Cart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/carts/' + cartId)
      .map(x => new Cart(x.items));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId()
    this.db.object('/carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCartItem(cartId: string, productId: string) {
    return this.db.object('/carts/' + cartId + '/items/' + productId)
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getCartItem(cartId, product.$key);
    
    item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change
      if(quantity === 0) item$.remove();
      else {
        item$.update({ 
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      }
    })
  }
}
