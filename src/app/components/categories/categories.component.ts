import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);

  AllCategories: WritableSignal<ICategory[]> = signal([]);

  ngOnInit(): void {
    this._CategoriesService.getAllcategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.AllCategories.set(res.data);
      },
    });
  }
}
