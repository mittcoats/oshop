import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';

@Injectable()
export class ProductService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  create(product) {
    return this.db.list('/products').push(product);
  }
}
