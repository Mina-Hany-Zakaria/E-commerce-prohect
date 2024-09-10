import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IWishlist } from '../../core/interfaces/iwishlist';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  WishList: IWishlist[] = [];
  wishlist: string[] = [];
  ngOnInit(): void {
    this._WishlistService.getproducToWishList().subscribe({
      next: (res) => {
        console.log(res.data);
        this.WishList = res.data;
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

  removeitemfromWishlist(id: string): void {
    this._WishlistService.deleteitemfromWishList(id).subscribe({
      next: (res) => {
        console.log(res);
        this.wishlist = res.data;
        const newproductData = this.WishList.filter((item: any) =>
          this.wishlist.includes(item._id)
        );
        this.WishList = newproductData;
      },
    });
  }

  confirmBox(id: string) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        );
        this.removeitemfromWishlist(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }
}
