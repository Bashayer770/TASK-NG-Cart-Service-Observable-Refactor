import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../data/products';
import { BehaviorSubject, isObservable } from 'rxjs';

export type CartItem = Product & { quantity: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  _cart = signal<CartItem[]>([]);
  cart = this._cart.asReadonly();

  readonly total = computed(() =>
    this._cart().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  addToCart(product: Product) {
    const cart = this._cart();
    const index = cart.findIndex((p) => p.id === product.id);

    if (index > -1) {
      const existing = cart[index];
      if (existing.quantity < existing.stock) {
        const updated = [...cart];
        updated[index] = { ...existing, quantity: existing.quantity + 1 };
        this._cart.set(updated);
      }
    } else {
      this._cart.set([...cart, { ...product, quantity: 1 }]);
    }
  }

  getCart() {
    return this._cart();
  }

  incrementQuantity(productId: number) {
    const cart = this._cart();
    const updated = cart.map((item) =>
      item.id === productId && item.quantity < item.stock
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    this._cart.set(updated);
  }

  decrementQuantity(productId: number) {
    const cart = this._cart();
    const updated = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    this._cart.set(updated);
  }

  removeFromCart(productId: number) {
    const filtered = this._cart().filter((item) => item.id !== productId);
    this._cart.set(filtered);
  }

  clearCart() {
    this._cart.set([]);
  }

  getTotal() {
    return this.total();
  }
}
