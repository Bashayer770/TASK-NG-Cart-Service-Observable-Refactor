import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartCount = computed(() =>
    this.cartService.cart().reduce((total, item) => total + item.quantity, 0)
  );
  constructor(private cartService: CartService) {}
}
