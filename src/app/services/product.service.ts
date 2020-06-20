import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Product} from '../models/product';
import {ResponseObjModel} from '../models/response-obj.model';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay, takeUntil} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
productSubject$ = new Subject<ResponseObjModel<any>>();
  constructor(private http: HttpClient) { }

  productListCache$: Observable<Product[]>;
  private productListReload$ = new Subject<void>();
  selectProducts(): Observable<Product[]>{
    if(!this.productListCache$) {
      this.productListCache$ = this.callApiToGetProducts().pipe(
        takeUntil(this.productListReload$),
        shareReplay(1),
        map( (res: ResponseObjModel<any>) =>{
          if (res === null || res.code === '00') {
            return null;
          }else
            return res.data;
        })
      )
    }
    return this.productListCache$
  }

  reloadProducts(){
    this.productListReload$.next();
    this.productListCache$ = null;
  }

  callApiToGetProducts(): Observable<ResponseObjModel<any>>{
    return this.http.get<ResponseObjModel<any>>('http://localhost:8080/api/productList');
  }
}
