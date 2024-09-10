import { WishlistComponent } from './components/wishlist/wishlist.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

export const routes: Routes = [


 
  { 
    path: '', 
    component: BlankLayoutComponent, 
    canActivate: [authGuard], 
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { 
        path: 'home', 
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) 
      },
      { 
        path: 'products', 
        loadComponent: () => import('./components/product/product.component').then(m => m.ProductComponent) 
      },
      { 
        path: 'cart', 
        loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) 
      },
      { 
        path: 'categories', 
        loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent) 
      },
      { 
        path: 'brands', 
        loadComponent: () => import('./components/branda/branda.component').then(m => m.BrandaComponent) 
      },
      { 
        path: 'wishlist', 
        loadComponent: () => import('./components/wishlist/wishlist.component').then(m => m.WishlistComponent) 
      },
      { 
        path: 'details/:id', 
        loadComponent: () => import('./components/details/details.component').then(m => m.DetailsComponent) 
      },
      { 
        path: 'subcategory/:id', 
        loadComponent: () => import('./components/subcategory/subcategory.component').then(m => m.SubcategoryComponent) 
      },
      { 
        path: 'allorders', 
        loadComponent: () => import('./components/allorders/allorders.component').then(m => m.AllordersComponent) 
      },
      { 
        path: 'orders/:id', 
        loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent) 
      },
    ]
  },

  { 
    path: '', 
    component: AuthLayoutComponent, 
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { 
        path: 'login', 
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) 
      },
      { 
        path: 'register', 
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) 
      },
      { 
        path: 'forgot', 
        loadComponent: () => import('./components/forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent) 
      }
    ]
  },




  { path: '**', loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent)   }

];
