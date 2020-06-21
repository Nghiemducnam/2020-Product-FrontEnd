import { Component, OnInit } from '@angular/core';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {ProductListReloaded, ProductListRequested} from '../../actions/product.action';
import {isProductListLoaded, selectProductList} from '../../selectors/product.selector';
import {Product} from '../../models/product';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
products: Product[];
isLoaded$: Observable<boolean>
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ProductListRequested());
    this.store.pipe(select(selectProductList)).subscribe(response => {this.products = response
      ////////////
      console.log(this.products)
    })
    this.isLoaded$ = this.store.pipe(select(isProductListLoaded));
  }


  update() {
    this.store.dispatch(new ProductListReloaded())
  }
}
