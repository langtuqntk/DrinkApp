import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { KhachHang } from './khachhang';

@Injectable()
export class KhachHangService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private KhachHangsUrl = `api/khachhangs`;
  
  constructor(private http: Http) { }

  getKhachHangs(): Promise<KhachHang[]> {
    return this.http.get(this.KhachHangsUrl)
               .toPromise()
               .then(response => response.json() as KhachHang)
               .catch(this.handleError);
  }

  getKhachHang(id: string): Promise<KhachHang> {
    const url = `${this.KhachHangsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as KhachHang)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.KhachHangsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(khachHang: KhachHang): Promise<KhachHang> {
    const url = `${this.KhachHangsUrl}/${khachHang._id}`;
    return this.http
      .put(url, JSON.stringify(khachHang), {headers: this.headers})
      .toPromise()
      .then(() => khachHang)
      .catch(this.handleError);
  }

  create(khachHang: KhachHang): Promise<KhachHang> {
    return this.http
      .post(this.KhachHangsUrl, JSON.stringify(khachHang), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as KhachHang)
      .catch(this.handleError);
  }
   
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}