import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from './connection.service';
import { FinancialProduct, ProfileProduct } from '../models/products.model';

@Injectable()
export class FinancialProductsService {
  private _productsURL: string;
  private _profileProductURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._productsURL = _conn.APIUrl + 'financialproducts';
    this._profileProductURL = _conn.APIUrl + 'profileproducts';
  }

  getProducts(): Observable<FinancialProduct[]> {
    return this._http.get<FinancialProduct[]>(this._productsURL);
  }

  createProduct(product: FinancialProduct): Observable<FinancialProduct> {
    return this._http.post<FinancialProduct>(this._productsURL, JSON.stringify(product), { headers: this._headers });
  }

  editProduct(id: number, product: FinancialProduct) {
    return this._http.put(`${this._productsURL}/${id}`, JSON.stringify(product), { headers: this._headers });
  }

  deleteProduct(id: number) {
    return this._http.delete(`${this._productsURL}/${id}`, { headers: this._headers });
  }

  addProfileProduct(product: ProfileProduct): Observable<ProfileProduct> {
    return this._http.post<ProfileProduct>(this._profileProductURL, JSON.stringify(product), { headers: this._headers });
  }

  editProfileProduct(id: number, product: ProfileProduct) {
    return this._http.put(`${this._profileProductURL}/${id}`, JSON.stringify(product), { headers: this._headers });
  }

  deleteProfileProduct(id: number) {
    return this._http.delete(`${this._profileProductURL}/${id}`, { headers: this._headers });
  }
}
