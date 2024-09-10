import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);

  CartId: string | null = '';
  orders: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.CartId = params.get('id');
      },
    });
  }

  orderSubmit(): void {
    console.log(this.orders.value);
    this._OrdersService.CheckOut(this.CartId, this.orders.value).subscribe({
      next: (res) => {
        console.log(res);

        if (res.status === 'success') {
          window.open(res.session.url, '_self');
        }
      },
    });
  }
}
