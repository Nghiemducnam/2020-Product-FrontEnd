import { Component, OnInit } from '@angular/core';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {ProductListRequested} from '../../actions/product.action';
import {isProductListLoaded, selectProductList} from '../../selectors/product.selector';
import {Product} from '../../models/product';
import {Observable} from 'rxjs';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
products: Product[];
isLoaded$: Observable<boolean>
  constructor(private store: Store<AppState>,
              private productService: ProductService) {
  this.productService.productSubject$.subscribe(res =>{
    if(res.data == '00'){
      this.products = res.data;
      console.log(this.products)
      this.selectProducts();
    }else
      return;
  })
  }

  ngOnInit(): void {
    this.store.dispatch(new ProductListRequested());
    // this.productService.callApiToGetProducts().subscribe(res => {
    //   this.products = res.data;
    //   console.log(this.products)
    // })
    this.selectProducts();
  }

  selectProducts(){
    this.store.pipe(select(selectProductList)).subscribe((response: Product[]) => {this.products = response
    ////////////
      console.log(this.products)
    })
    this.isLoaded$ = this.store.pipe(select(isProductListLoaded));
  }

}
