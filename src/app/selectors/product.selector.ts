import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductListState} from '../reducer/product.reducer';

export const productListState = createFeatureSelector<ProductListState>('product-list');

export const selectProductList = createSelector(
  productListState,
  state => state.productList
)

export const isProductListLoaded = createSelector(
  productListState,
  state => state.isLoaded
);
