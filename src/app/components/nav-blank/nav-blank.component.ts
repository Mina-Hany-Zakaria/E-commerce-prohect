import { Component, inject, OnInit, computed, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css',
})
export class NavBlankComponent implements OnInit {
  readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);

  CountNumber: Signal<number> = computed(() => this._CartService.CartNumber());

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.CartNumber.set(res.numOfCartItems);
      },
    });
  }
}
