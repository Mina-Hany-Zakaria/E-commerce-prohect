import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { log } from 'console';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import {
  CurrencyPipe,
  DatePipe,
  JsonPipe,
  LowerCasePipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    RouterLink,
    SearchPipe,
    FormsModule,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  productSub!: Subscription;

  productsList: WritableSignal<IProduct[]> = signal([]);
  CategoriesList: WritableSignal<ICategory[]> = signal([]);
  text: string = '';
  wishlist: string[] = [];

  customOptionsMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    items: 1,
    nav: true,
  };

  customOptionsCategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this._CategoriesService.getAllcategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.CategoriesList.set(res.data);
      },
    });

    this.productSub = this._ProductsService.getAllproduct().subscribe({
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

  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
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
