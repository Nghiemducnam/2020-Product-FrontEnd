import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {productsReducer} from '../reducers/product.reducer';
import {ProductsEffect} from '../effects/product.effect';


@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature('product-list', productsReducer),
    EffectsModule.forFeature([ProductsEffect])
  ]
})
export class ProductsModule { }
