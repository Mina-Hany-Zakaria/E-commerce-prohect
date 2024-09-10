import { ISubsategory } from './../../core/interfaces/isubsategory';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css',
})
export class SubcategoryComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  id: any = '';

  getSpecificCategory: WritableSignal<ISubsategory[]> = signal([]);

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        console.log(params.get('id'));
        let id = params.get('id');

        this._CategoriesService.getSpecificSub(id).subscribe({
          next: (res) => {
            console.log(res.data);
            this.getSpecificCategory.set(res.data);
          },
        });
      },
    });
  }
}
