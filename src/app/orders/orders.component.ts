import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders$;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { 
    this.orders$ = authService.user$.switchMap(u => orderService.getOrderbyUser(u.uid));
  }
}
