import {Action} from '@ngrx/store';
import {Product} from '../models/product';

export enum ProductsActionType {
  ProductListRequested = '[Product] Product List Requested',
  ProductListReloaded = '[Product] Product List Reloaded',
  ProductListLoaded = '[Product] Product List Loaded',
}

export class ProductListRequested implements Action{
  readonly type = ProductsActionType.ProductListRequested;
}

export class ProductListLoaded implements Action{
  readonly type = ProductsActionType.ProductListLoaded;
  constructor(public payload: {products: Product[]}) {
  }
}

export class ProductListReloaded implements Action{
  readonly type = ProductsActionType.ProductListReloaded;
}

export type ProductActions = ProductListRequested | ProductListLoaded | ProductListReloaded;
