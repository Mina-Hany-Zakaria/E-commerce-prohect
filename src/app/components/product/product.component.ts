import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    FormsModule,
    UpperCasePipe,
    LowerCasePipe,
    SearchPipe,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishlistService = inject(WishlistService);

  productsList: WritableSignal<IProduct[]> = signal([]);
  CategoriesList: WritableSignal<ICategory[]> = signal([]);
  text: string = '';
  wishlist: string[] = [];

  ngOnInit(): void {
    this._CategoriesService.getAllcategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.CategoriesList.set(res.data);
      },
    });

    this._ProductsService.getAllproduct().subscribe({
      next: (res) => {
        console.log(res.data);

        this.productsList.set(res.data);
      },
    });

    this._WishlistService.getproducToWishList().subscribe({
      next: (res) => {
        console.log(res);
        const newdata = res.data.map((item: any) => item._id);
        this.wishlist = newdata;
      },
    });
  }

  addcart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);

        this._ToastrService.success(res.message, 'FreshCart');
        this._CartService.CartNumber.set(res.numOfCartItems);
      },
    });
  }

  addtoWishlist(id: string): void {
    this._WishlistService.addproductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishlist = res.data;
        this._ToastrService.success(res.message, 'Wishlist');
      },
    });
  }
}
