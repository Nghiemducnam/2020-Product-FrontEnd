import {Product} from '../models/product';
import {ProductActions, ProductsActionType} from '../actions/product.action';

export interface ProductListState {
  isLoaded: boolean;
  productList: Product[];
}

export const initialProductsState: ProductListState = {
  isLoaded: false,
  productList: []
};

export function productsReducer(state = initialProductsState, action: ProductActions): ProductListState {
  switch (action.type) {
    // case ProductsActionType.ProductListRequested:
    //   return {
    //     ...state,
    //     isLoaded: false
    //   };
    case ProductsActionType.ProductListLoaded:
      return {
        ...state,
        isLoaded: true,
        productList: action.payload.products
      };
    default:
      return state;
  }
}
