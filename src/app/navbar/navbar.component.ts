import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cartItemCount: number = 0;

  constructor(
    private auth: AuthService,
    private cartService: CartService
  ) {
    
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    let cart$ = await this.cartService.getCart();
    cart$.subscribe(cart => {
      this.cartItemCount = 0
      for (let productId in cart.items) {
        this.cartItemCount += cart.items[productId].quantity;
      }
    })
  }

  logout() {
    this.auth.logout();
  }
}
