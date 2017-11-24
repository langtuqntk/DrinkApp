import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Ban } from './ban';

@Injectable()
export class BanService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private bansUrl = `api/bans`;
  
  constructor(private http: Http) { }

  getBans(): Promise<Ban[]> {
    return this.http.get(this.bansUrl)
               .toPromise()
               .then(response => response.json() as Ban)
               .catch(this.handleError);
  }

  getBan(id: string): Promise<Ban> {
    const url = `${this.bansUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Ban)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.bansUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(ban: Ban): Promise<Ban> {
    const url = `${this.bansUrl}/${ban._id}`;
    return this.http
      .put(url, JSON.stringify(ban), {headers: this.headers})
      .toPromise()
      .then(() => ban)
      .catch(this.handleError);
  }

  create(ban: Ban): Promise<Ban> {
    return this.http
      .post(this.bansUrl, JSON.stringify(ban), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Ban)
      .catch(this.handleError);
  }
   
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}