import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { IBrand } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-branda',
  standalone: true,
  imports: [],
  templateUrl: './branda.component.html',
  styleUrl: './branda.component.css',
})
export class BrandaComponent implements OnInit {
  private readonly _BrandService = inject(BrandService);

  AllBrands: WritableSignal<IBrand[]> = signal([]);

  ngOnInit(): void {
    this._BrandService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.AllBrands.set(res.data);
      },
    });
  }
}
