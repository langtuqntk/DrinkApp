import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { NhanVien } from './nhanvien';

@Injectable()
export class NhanVienService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private NhanViensUrl = `api/nhanviens`;
  
  constructor(private http: Http) { }

  getNhanViens(): Promise<NhanVien[]> {
    return this.http.get(this.NhanViensUrl)
               .toPromise()
               .then(response => response.json() as NhanVien)
               .catch(this.handleError);
  }

  getNhanVien(id: string): Promise<NhanVien> {
    const url = `${this.NhanViensUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as NhanVien)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.NhanViensUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(nhanVien: NhanVien): Promise<NhanVien> {
    const url = `${this.NhanViensUrl}/${nhanVien._id}`;
    return this.http
      .put(url, JSON.stringify(nhanVien), {headers: this.headers})
      .toPromise()
      .then(() => nhanVien)
      .catch(this.handleError);
  }

  create(nhanVien: NhanVien): Promise<NhanVien> {
    return this.http
      .post(this.NhanViensUrl, JSON.stringify(nhanVien), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as NhanVien)
      .catch(this.handleError);
  }
   
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}