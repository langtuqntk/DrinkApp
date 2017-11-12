import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { PhieuXuat, PhieuXuatCtiet, HoaDon } from './phieuxuat';

@Injectable()
export class PhieuXuatService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private PhieuXuatsUrl = `api/phieuxuats`;
  
  constructor(private http: Http) { }

  getPhieuXuats(): Promise<PhieuXuat[]> {
    return this.http.get(this.PhieuXuatsUrl)
               .toPromise()
               .then(response => response.json() as PhieuXuat)
               .catch(this.handleError);
  }

  getPhieuXuat(id: string): Promise<HoaDon> {
    const url = `${this.PhieuXuatsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as HoaDon)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.PhieuXuatsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(phieuxuat: PhieuXuat): Promise<PhieuXuat> {
    const url = `${this.PhieuXuatsUrl}/${phieuxuat._id}`;
    return this.http
      .put(url, JSON.stringify(phieuxuat), {headers: this.headers})
      .toPromise()
      .then(() => phieuxuat)
      .catch(this.handleError);
  }

  create(phieuxuat: PhieuXuat): Promise<PhieuXuat> {
    console.log(phieuxuat);
    return this.http
      .post(this.PhieuXuatsUrl, JSON.stringify(phieuxuat), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as PhieuXuat)
      .catch(this.handleError);
  }

  createCtiet(data: object): Promise<PhieuXuatCtiet> {
    return this.http
      .post(this.PhieuXuatsUrl + '/detail', JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as PhieuXuatCtiet)
      .catch(this.handleError);
  }
   
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}