import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { PhieuNhap, PhieuNhapCtiet, Detail } from './phieu';

@Injectable()
export class PhieuNhapService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private PhieuNhapsUrl = `api/phieunhaps`;
  
  constructor(private http: Http) { }

  getPhieuNhaps(): Promise<PhieuNhap[]> {
    return this.http.get(this.PhieuNhapsUrl)
               .toPromise()
               .then(response => response.json() as PhieuNhap)
               .catch(this.handleError);
  }

  getPhieuNhap(id: string): Promise<Detail> {
    const url = `${this.PhieuNhapsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Detail)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.PhieuNhapsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(phieuNhap: PhieuNhap): Promise<PhieuNhap> {
    const url = `${this.PhieuNhapsUrl}/${phieuNhap._id}`;
    return this.http
      .put(url, JSON.stringify(phieuNhap), {headers: this.headers})
      .toPromise()
      .then(() => phieuNhap)
      .catch(this.handleError);
  }

  create(phieuNhap: PhieuNhap): Promise<PhieuNhap> {
    console.log(phieuNhap);
    return this.http
      .post(this.PhieuNhapsUrl, JSON.stringify(phieuNhap), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as PhieuNhap)
      .catch(this.handleError);
  }

  createCtiet(data: object): Promise<PhieuNhapCtiet> {
    return this.http
      .post(this.PhieuNhapsUrl + '/detail', JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as PhieuNhapCtiet)
      .catch(this.handleError);
  }
   
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}