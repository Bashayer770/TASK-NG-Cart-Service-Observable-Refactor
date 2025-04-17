import { Component } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart = this.cartService.cart;

  constructor(private cartService: CartService) {}

  increment(id: number) {
    this.cartService.incrementQuantity(id);
  }

  decrement(id: number) {
    this.cartService.decrementQuantity(id);
  }

  remove(id: number) {
    this.cartService.removeFromCart(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }
}
