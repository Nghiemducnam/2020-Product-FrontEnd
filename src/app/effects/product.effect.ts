import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {ProductListLoaded, ProductListRequested, ProductsActionType} from '../actions/product.action';
import {map, mergeMap} from 'rxjs/operators';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import {defer, Observable, of} from 'rxjs';

@Injectable()
export class ProductsEffect {
  @Effect()
  loadAllProducts$ = this.actions$
    .pipe(
      ofType<ProductListRequested>(ProductsActionType.ProductListRequested),
      mergeMap( () =>
      this.productService.selectProducts()),
      map( (result: Product[]) =>{
        return new ProductListLoaded({
          products: result
        });
      })
    );

  @Effect()
  reloadAllProducts$ = this.actions$
    .pipe(
      ofType<ProductListLoaded>(ProductsActionType.ProductListLoaded),
      map( () =>{
        this.productService.reloadProducts();
        return new ProductListRequested();
      })
    );

  @Effect()
  init$: Observable<Action> = defer( () => {
    return of ({type: 'NO_ACTION'});
  })

  constructor(private actions$: Actions, private productService: ProductService, private store: Store<AppState>) {
  }
}
